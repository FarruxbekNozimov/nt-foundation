const fs = require('fs');
const path = require('path');

function makeFiles(
  folderName: string,
  name: string,
  columns: object,
  hasMany: object = {},
  createDto: object = {},
  updateDto: object = {},
  connect: object = {},
) {
  createDto =
    Object.keys(createDto).length === 0
      ? Object.fromEntries(Object.entries(columns).map((i) => [i[0], i[1][0]]))
      : createDto;

  // ALL FUNCTIONS
  let mkDir = path.resolve(__dirname, '..', '..', folderName);
  let readFromExample = (name: string) => {
    return fs
      .readFileSync(path.resolve(__dirname, 'example', name), 'utf8')
      .toString();
  };
  let replaceName = (content: string) => {
    let splitContent = content.split('\n');
    for (let i in splitContent) {
      if (
        splitContent[i].includes('import') ||
        splitContent[i].includes('from')
      ) {
        splitContent[i] = splitContent[i].replace(
          /example./g,
          folderName + '.',
        );
      }
    }
    content = splitContent.join('\n');
    content = content
      .replace(/@Table/, `@Table({ tableName: '${folderName}' })`)
      .replace(/@Controller/, `@Controller('${folderName}')`)
      .replace(/example/g, name[0].toLowerCase() + name.slice(1, name.length))
      .replace(/Example/g, name);
    return content;
  };

  let writeProps = (content: string) => {
    let propsArea: string = '';
    let attrArea: string = '';
    for (let i in columns) {
      if (!columns[i][2]) {
        propsArea += `@Column(${columns[i][1]})\n\t${i}:${columns[i][0]};\n\n\t`;
      } else {
        let file = columns[i][2].column.replace('_', '-');
        content =
          `import { ${columns[i][2].name} } from "../../${file}/models/${file}.model";\n` +
          content;
        propsArea += `@ForeignKey(() => ${columns[i][2].name})\n\t@Column(${columns[i][1]})\n\t${i}: number;\n\t@BelongsTo(() => ${columns[i][2].name})\n\t${columns[i][2].column}: ${columns[i][2].name}[];\n\n\t`;
      }
      attrArea += `${i}:${columns[i][0]}\n\t`;
    }
    let hasManyImports: string = '';
    let hasManies: string = '';
    if (hasMany) {
      for (let j in hasMany) {
        hasManyImports += `import { ${j} } from '../../${hasMany[j].replace(
          /_/g,
          '-',
        )}/models/${hasMany[j].replace(/_/g, '-')}.model';\n`;
        hasManies += `@HasMany(() => ${j})\n\t${hasMany[j]}: ${j}[];\n\n\t`;
      }
    }
    content = hasManyImports + content;
    return content
      .replace(/'column'/, propsArea + hasManies)
      .replace(/'attr'/, attrArea);
  };

  let writeCreateDto = (content: string) => {
    let propsArea: string = '';
    for (let i in createDto) {
      propsArea += `${i}: ${createDto[i]};\n\t`;
    }
    return content.replace(/'dto'/, propsArea);
  };

  let writeUpdateDto = (content: string) => {
    let propsArea: string = '';
    let dto = Object.keys(updateDto).length === 0 ? createDto : updateDto;
    for (let i in dto) {
      propsArea += `${i}?: ${dto[i]};\n\t`;
    }
    return content.replace(/'dto'/, propsArea);
  };

  // FUNTIONS END

  try {
    fs.mkdirSync(mkDir);
  } catch (error) {
    console.log('Folder is already created.');
  }
  let controller = readFromExample('example.controller.ts');
  let module = readFromExample('example.module.ts');
  let service = readFromExample('example.service.ts');
  let model = readFromExample('models/example.model.ts');
  let createDtoFile = readFromExample('dto/create-example.dto.ts');
  let updateDtoFile = readFromExample('dto/update-example.dto.ts');

  // CREATE CONTROLLER FILE
  try {
    fs.writeFileSync(
      mkDir + `/${folderName}.controller.ts`,
      replaceName(controller),
    );
    console.log('Controller created');
  } catch (error) {
    console.log('Controllerda Yozishda xatolik');
  }

  // CREATE SERVICE FILE
  try {
    fs.writeFileSync(mkDir + `/${folderName}.service.ts`, replaceName(service));
    console.log('Service created');
  } catch (error) {
    console.log('Service Yozishda xatolik');
  }

  // CREATE MODULE FILE
  try {
    fs.writeFileSync(mkDir + `/${folderName}.module.ts`, replaceName(module));
    console.log('Module created');
  } catch (error) {
    console.log('Module Yozishda xatolik');
  }

  // CREATE MODEL
  try {
    try {
      fs.mkdirSync(mkDir + '/models');
      console.log('Model created');
    } catch (error) {
      console.log('Model Papka oldin bor edi.');
    }
    fs.writeFileSync(
      mkDir + `/models/${folderName}.model.ts`,
      writeProps(replaceName(model)),
    );
    console.log('Model created');
  } catch (error) {
    console.log('Model Yozishda xatolik');
  }

  // CREATE DTO FOLDER
  try {
    fs.mkdirSync(mkDir + '/dto');
    console.log('Dto created');
  } catch (error) {
    console.log('Dto Papka oldin bor edi.');
  }

  // CREATE CREATEDTO FILE
  try {
    fs.writeFileSync(
      mkDir + `/dto/create-${folderName}.dto.ts`,
      writeCreateDto(replaceName(createDtoFile)),
    );
    console.log('CreateDto created');
  } catch (error) {
    console.log('CreateDto Yozishda xatolik');
  }

  // CREATE UPDATEDTO FILE
  try {
    fs.writeFileSync(
      mkDir + `/dto/update-${folderName}.dto.ts`,
      writeUpdateDto(replaceName(updateDtoFile)),
    );
    console.log('UpdateDto created');
  } catch (error) {
    console.log('UpdateDto Yozishda xatolik');
  }
}

// // TEACHER
// makeFiles(
//   'teacher',
//   'Teacher',
//   {
//     username: ['string', '{ type: DataType.STRING }'],
//     first_name: ['string', '{ type: DataType.STRING }'],
//     last_name: ['string', '{ type: DataType.STRING }'],
//     phone: ['string', '{ type: DataType.STRING }'],
//     password: ['string', '{ type: DataType.STRING }'],
//     email: ['string', '{ type: DataType.STRING }'],
//     birth_date: ['string', '{ type: DataType.STRING }'],
//     gender_id: [
//       'number',
//       '{ type: DataType.INTEGER }',
//       { name: 'Gender', column: 'gender' },
//     ],
//     otp_id: [
//       'number',
//       '{ type: DataType.INTEGER }',
//       { name: 'Otp', column: 'otp' },
//     ],
//     is_active: ['boolean', '{ type: DataType.BOOLEAN }'],
//     refresh_token: ['string', '{ type: DataType.STRING }'],
//   },
//   {
//     Classes: 'classes',
//   },
// );

// // ADMIN
// makeFiles(
//   'admin',
//   'Admin',
//   {
//     username: ['string', '{ type: DataType.STRING }'],
//     phone: ['string', '{ type: DataType.STRING }'],
//     password: ['string', '{ type: DataType.STRING }'],
//     email: ['string', '{ type: DataType.STRING }'],
//     is_active: ['boolean', '{ type: DataType.BOOLEAN }'],
//     refresh_token: ['string', '{ type: DataType.STRING }'],
//   },
// );


// // GENDER
// makeFiles(
//   'gender',
//   'Gender',
//   {
//     name: ['string', '{ type: DataType.STRING }'],
//   },
//   {
//     Teacher: 'teacher',
//     Student: 'student',
//   },
// );

// // STUDENT
// makeFiles(
//   'student',
//   'Student',
//   {
//     username: ['string', '{ type: DataType.STRING }'],
//     first_name: ['string', '{ type: DataType.STRING }'],
//     last_name: ['string', '{ type: DataType.STRING }'],
//     phone_number: ['string', '{ type: DataType.STRING }'],
//     phone_number_alter: ['string', '{ type: DataType.STRING }'],
//     password: ['string', '{ type: DataType.STRING }'],
//     email: ['string', '{ type: DataType.STRING }'],
//     birth_date: ['string', '{ type: DataType.STRING }'],
//     gender_id: [
//       'number',
//       '{ type: DataType.INTEGER }',
//       { name: 'Gender', column: 'gender' },
//     ],
//     otp_id: [
//       'number',
//       '{ type: DataType.INTEGER }',
//       { name: 'Otp', column: 'otp' },
//     ],
//     is_active: ['boolean', '{ type: DataType.BOOLEAN }'],
//     refresh_token: ['string', '{ type: DataType.STRING }'],
//   },
//   { Classes: 'class' },
// );

// CLASS
makeFiles(
  'classes',
  'Classes',
  {
    student_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Student', column: 'student' },
    ],
    teacher_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Teacher', column: 'teacher' },
    ],
    is_active: ['boolean', '{ type: DataType.BOOLEAN }'],
  },
  { Message: 'message' },
);

// // OTP
// makeFiles('otp', 'Otp', {
//   otp: ['string', '{ type: DataType.STRING }'],
//   expiration_time: ['Date', '{ type: DataType.DATE }'],
//   verified: ['boolean', '{ type: DataType.BOOLEAN }'],
// });

// // LESSON
// makeFiles(
//   'lesson',
//   'Lesson',
//   {
//     unit: ['number', '{ type: DataType.INTEGER }'],
//     theme: ['string', '{ type: DataType.STRING }'],
//     description: ['string', '{ type: DataType.STRING }'],
//     video_id: [
//       'number',
//       '{ type: DataType.INTEGER }',
//       { name: 'Video', column: 'video' },
//     ],
//     file_id: [
//       'number',
//       '{ type: DataType.INTEGER }',
//       { name: 'File', column: 'file' },
//     ],
//     end_time: ['Date', '{ type: DataType.DATE }'],
//   },
//   { LessonTask: 'lesson_task' },
// );

// // LESSON TASK
// makeFiles('lesson-task', 'LessonTask', {
//   lesson_id: [
//     'number',
//     '{ type: DataType.INTEGER }',
//     { name: 'Lesson', column: 'lesson' },
//   ],
//   task_id: [
//     'number',
//     '{ type: DataType.INTEGER }',
//     { name: 'Tasks', column: 'tasks' },
//   ],
// });

// // TASKS
// makeFiles(
//   'tasks',
//   'Tasks',
//   {
//     title: ['string', '{ type: DataType.STRING }'],
//     description: ['string', '{ type: DataType.STRING }'],
//     difficult_id: [
//       'number',
//       '{ type: DataType.INTEGER }',
//       { name: 'Difficult', column: 'difficult' },
//     ],
//     constraint_id: [
//       'number',
//       '{ type: DataType.INTEGER }',
//       { name: 'Video', column: 'video' },
//     ],
//     answer_id: [
//       'number',
//       '{ type: DataType.INTEGER }',
//       { name: 'Answer', column: 'answer' },
//     ],
//   },
//   { LessonTask: 'lesson_task', TasksSample: 'tasks_sample' },
// );

// // DIFFICULT
// makeFiles(
//   'difficult',
//   'Difficult',
//   {
//     name: ['string', '{ type: DataType.STRING }'],
//   },
//   { Tasks: 'tasks' },
// );

// // CONSTRAINTS
// makeFiles(
//   'constraints',
//   'Constraints',
//   {
//     constraint: ['string', '{ type: DataType.STRING }'],
//   },
//   { Tasks: 'tasks' },
// );

// // HINTS
// makeFiles(
//   'hints',
//   'Hints',
//   {
//     description: ['string', '{ type: DataType.STRING }'],
//     code: ['string', '{ type: DataType.STRING }'],
//   },
//   { Tasks: 'tasks' },
// );

// // TASKS SAMPLE
// makeFiles('tasks-sample', 'TasksSample', {
//   input: ['string', '{ type: DataType.STRING }'],
//   output: ['string', '{ type: DataType.STRING }'],
//   description: ['string', '{ type: DataType.STRING }'],
//   task_id: [
//     'number',
//     '{ type: DataType.INTEGER }',
//     { name: 'Tasks', column: 'tasks' },
//   ],
// });

// // VIDEOS
// makeFiles('video', 'Video', {
//   link: ['string', '{ type: DataType.STRING }'],
//   private: ['boolean', '{ type: DataType.BOOLEAN }'],
// }, { Lesson: 'lesson' });

// // FILE
// makeFiles('file', 'File', {
//   title: ['string', '{ type: DataType.STRING }'],
//   link: ['string', '{ type: DataType.STRING }'],
//   private: ['boolean', '{ type: DataType.BOOLEAN }'],
// }, { Lesson: 'lesson' });

// // MESSAGE
// makeFiles('message', 'Message', {
//   text: ['string', '{ type: DataType.STRING }'],
//   user_id: [
//     'number',
//     '{ type: DataType.INTEGER }',
//     { name: 'Student', column: 'student' },
//   ],
//   media_id: [
//     'number',
//     '{ type: DataType.INTEGER }',
//     { name: 'Media', column: 'media' },
//   ],
//   reply_to: [
//     'number',
//     '{ type: DataType.INTEGER }',
//     { name: 'Message', column: 'message' },
//   ],
//   classes_id: [
//     'number',
//     '{ type: DataType.INTEGER }',
//     { name: 'Classes', column: 'classes' },
//   ],
// });

// // MEDIA
// makeFiles('media', 'Media', {
//   link: ['string', '{ type: DataType.STRING }'],
//   private: ['boolean', '{ type: DataType.BOOLEAN }'],
// }, { Message: 'message' });

// // RATING
// makeFiles('rating', 'Rating', {
//   student_id: [
//     'number',
//     '{ type: DataType.INTEGER }',
//     { name: 'Student', column: 'student' },
//   ],
//   stars: ['number', '{ type: DataType.INTEGER }'],
// });

// // OTP
// makeFiles('otp', 'Otp', {
//   otp: ['string', '{ type: DataType.STRING }'],
//   expiration_time: ['Date', '{ type: DataType.DATE }'],
//   verified: ['boolean', '{ type: DataType.BOOLEAN }'],
// }, { Teacher: 'teacher', Student: 'student' });


// // ANSWER
// makeFiles('answer', 'Answer', {
//   description: ['string', '{ type: DataType.STRING }'],
//   code: ['string', '{ type: DataType.STRING }'],
// }, { Tasks: 'tasks' });

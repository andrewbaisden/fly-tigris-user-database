import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });

export async function fetchAllUsersFromS3() {
  try {
    const s3 = new S3Client({
      region: process.env.NEXT_PUBLIC_SECRET_AWS_REGION,
      endpoint: process.env.NEXT_PUBLIC_SECRET_AWS_ENDPOINT_URL_S3,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_SECRET_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_AWS_SECRET_ACCESS_KEY,
      },
    });
    const commandDetails = new ListObjectsV2Command({
      Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
      MaxKeys: 10,
    });
    const { Contents } = await s3.send(commandDetails);
    console.log('List Result', Contents);
    if (!Contents) {
      console.log('no users');
    } else {
      const users = await Promise.all(
        Contents.map(async (item) => {
          const getObject = new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
            Key: item.Key,
          });
          const { Body } = await s3.send(getObject);
          const data = await streamToString(Body);
          const userObject = JSON.parse(data);
          console.log('Data', data);
          return userObject;
        })
      );
      return users;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getUserById(users, userId) {
  if (!users) {
    console.log('no users');
  } else {
    return users.find((user) => user.id === userId);
  }
}

export async function getUserByIdEmail(users, email) {
  if (!users) {
    console.log('no users');
  } else {
    return users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
}

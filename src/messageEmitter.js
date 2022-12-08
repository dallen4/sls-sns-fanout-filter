const SNS = require('aws-sdk/clients/sns');

const handler = async function messageEmitter(event) {
  const client = new SNS();
  console.log(event);
  const { eventType } = JSON.parse(event.body);
  console.log(eventType);
  await client
    .publish({
      TopicArn: process.env.SNS_TOPIC,
      Message: `uh oh! (${eventType})`,
      MessageAttributes: {
        event_type: {
          DataType: 'String',
          StringValue: eventType,
        },
      },
    })
    .promise();

  console.log(`sent message to ${eventType}`);

  return { statusCode: 200 };
};

module.exports = { handler };

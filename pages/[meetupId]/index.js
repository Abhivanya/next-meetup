import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  return <MeetupDetail meetupData={props.meetupData} />;
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.mnr2x.mongodb.net/?retryWrites=true&w=majority&appName=meetups"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupsId = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetupsId.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.mnr2x.mongodb.net/?retryWrites=true&w=majority&appName=meetups"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupData = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  if (!meetupData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      meetupData: {
        id: meetupData._id.toString(),
        title: meetupData.title,
        description: meetupData.description,
        image: meetupData.image,
        address: meetupData.address,
      },
    },
    revalidate: 10,
  };
}

export default MeetupDetails;

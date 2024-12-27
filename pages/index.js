import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetup} />;
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.mnr2x.mongodb.net/?retryWrites=true&w=majority&appName=meetups"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  const formattedMeetups = meetups.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    address: meetup.address,
    description: meetup.description,
  }));

  return {
    props: {
      meetup: formattedMeetups,
    },
  };
}

export default HomePage;

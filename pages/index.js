import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First Meetup",
//     image: "https://dummyimage.com/600x400/000/fff&text=First+Meetup",
//     address: "Dummy Location",
//   },
//   {
//     id: "m2",
//     title: "Second Meetup",
//     image: "https://dummyimage.com/600x400/000/fff&text=Second+Meetup",
//     address: "Dummy Location 2",
//   },
//   {
//     id: "m3",
//     title: "Third Meetup",
//     image: "https://dummyimage.com/600x400/000/fff&text=Third+Meetup",
//     address: "Dummy Location 3",
//   },
// ];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meet up with NextJs</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups!!!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  // fetch data from API

  const client = await MongoClient.connect(
    "mongodb+srv://admin:123321123@cluster0.oayoy.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;

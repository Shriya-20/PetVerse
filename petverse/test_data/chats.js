import loginDoggy from "@/public/logindoggy.jpg";
import loginDoggy2 from "@/public/loginDoggies.jpg";
import default_profile from "@/public/default_user_profile_pic.jpeg";
import profile_bg from "@/public/profile_bg.jpg";
import profile_bg2 from "@/public/default_pet_profile_pic3.png";

const chats = [
  {
    id: 199,
    name: "Sathvik Chonga",
    profile_pic: loginDoggy,
    lastMessage:
      "Hey man!  lfksdlfhl lskhfklsdl alsdfhaslkdfklsd afklsdhfkl asdflasdk flkasdfl kasdfkasdfh sdkfhklsdhflasl fsdlhk hljl ",
    timestamp: "12:25",
    unread: 12,
    messages: [
      {
        id: 1,
        sender: "them",
        content:
          "Hey man! www.youtube.com asdfklasd  fasdla fas lfkdsjfl sdlf sdlfjsdkfjl sdkf sdlfjsdklfjlasdk flsdkjfklasd jfklsdjfklsjd lfkdlflasdk jflasd flsdkflkasdjf las",
        timestamp: "10:25",
        type: "text",
      },
      {
        id: 2,
        sender: "me",
        content:
          "Hey, what's up? How are you doing, my friend? It's been a while 😄dfklasdjkflasdflajsdlfjaskldflasdlfjlsdjfkljasdljflsfjasdljfkjsdlfasdjkfjlasdkflalsdjkfjalsdjlfkjsljfksdlfjskljlkflsdjkflasdjkfljkasdkljflsd;fkjasdlfjkasdljfjasdlfjklsdfjklasdjflkajsdlfjlsdjl",
        timestamp: "11:25",
        type: "text",
      },
      {
        id: 3,
        sender: "them",
        content: "Have you seen the latest holographic display technology?",
        timestamp: "12:25",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 4,
        sender: "them",
        content:
          "Duis https://leetcode.com/explore/interview/card/system-design-for-interviews-and-beyond/?utm_campaign=HomeBanner&utm_medium=Banner&utm_source=Banner&gio_link_id=GRwNarl9 velit esse cillum dolore. ldddddddddddddddddddddddddddddddddddddddfkslfsdkfjlsdjfksdlflsdjkfjlsdjfksdlfjkljsk",
        timestamp: "02:25",
        type: "text",
      },
      {
        id: 5,
        sender: "me",
        content: "External Link Title",
        link: "https://www.externallink.com",
        timestamp: "03:25",
        type: "link",
      },
      { id: 6, sender: "them", content: "Hey man!", timestamp: "10:25" },
      {
        id: 7,
        sender: "me",
        content:
          "Hey, what's up? How are you doing, my friend? It's been a while dfs sdfsd sf sdf sdf sdf sdf sd fsdf sdf sdf sd fsd fsd fs sdf 😄",
        timestamp: "11:25",
      },
      {
        id: 8,
        sender: "them",
        content: "Have you seen the latest holographic display technology?",
        timestamp: "12:25",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      },
      {
        id: 9,
        sender: "them",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        timestamp: "02:25",
        type: "image",
        url: loginDoggy,
      },
      {
        id: 10,
        sender: "me",
        content: "External Link Title",
        link: "https://www.externallink.com",
        timestamp: "03:25",
      },
      { id: 11, sender: "them", content: "Hey man!", timestamp: "10:25" },
      {
        id: 12,
        sender: "me",
        content: "https://www.youtube.com/",
        timestamp: "11:25",
      },
      {
        id: 13,
        sender: "them",
        content: "Have you seen the latest holographic display technology?",
        timestamp: "12:25",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      },
      {
        id: 14,
        sender: "them",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        timestamp: "02:25",
        type: "image",
        url: loginDoggy,
      },
      {
        id: 15,
        sender: "me",
        content: "External Link Title",
        link: "https://www.externallink.com",
        timestamp: "03:25",
      },
      { id: 16, sender: "them", content: "Hey man!", timestamp: "10:25" },
      {
        id: 17,
        sender: "me",
        content:
          "Hey, what's up? How are you doing, my friend? It's been a while dfs sdfsd sf sdf sdf sdf sdf sd fsdf sdf sdf sd fsd fsd fs sdf 😄",
        timestamp: "11:25",
      },
      {
        id: 18,
        sender: "them",
        content: "Have you seen the latest holographic display technology?",
        timestamp: "12:25",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      },
      {
        id: 19,
        sender: "them",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        timestamp: "02:25",
        type: "image",
        url: loginDoggy,
      },
      {
        id: 20,
        sender: "me",
        content: "External Link Title",
        link: "https://www.externallink.com",
        timestamp: "03:25",
      },
    ],
  },
  {
    id: 10,
    name: "Rithvik",
    profile_pic: loginDoggy2,
    lastMessage: "Hey man!",
    timestamp: "12:25",
    unread: 12,
    messages: [
      { id: 1, sender: "them", content: "Hey man!", timestamp: "10:25" },
      {
        id: 2,
        sender: "me",
        content:
          "Hey, what's up? How are you doing, my friend? It's been a while 😄",
        timestamp: "11:25",
      },
      {
        id: 3,
        sender: "them",
        content: "Have you seen the latest holographic display technology?",
        timestamp: "12:25",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 4,
        sender: "them",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        timestamp: "02:25",
      },
      {
        id: 5,
        sender: "me",
        content: "External Link Title",
        link: "https://www.externallink.com",
        timestamp: "03:25",
      },
    ],
  },
  {
    id: 9,
    name: "Shriya Chongi",
    profile_pic: default_profile,
    lastMessage: "Hey man!",
    timestamp: "12:25",
    unread: 12,
    messages: [
      { id: 1, sender: "them", content: "Hey man!", timestamp: "10:25" },
      {
        id: 2,
        sender: "me",
        content:
          "Hey, what's up? How are you doing, my friend? It's been a while dfs sdfsd sf sdf sdf sdf sdf sd fsdf sdf sdf sd fsd fsd fs sdf 😄",
        timestamp: "11:25",
      },
      {
        id: 3,
        sender: "them",
        content: "Have you seen the latest holographic display technology?",
        timestamp: "12:25",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      },
      {
        id: 4,
        sender: "them",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        timestamp: "02:25",
        type: "image",
        url: loginDoggy,
      },
      {
        id: 5,
        sender: "me",
        content: "External Link Title",
        link: "https://www.externallink.com",
        timestamp: "03:25",
      },
    ],
  },
  {
    id: 2,
    name: "Jerome White fsdkflajsdklfjasdljfklasdjlfjafdfsfsdfsdfsgfdfgdl",
    profile_pic: profile_bg,
    lastMessage: "Enter your message description here...",
    timestamp: "12:25",
    unread: 0,
  },
  {
    id: 73,
    name: "Madagascar Silver",
    profile_pic: profile_bg2,
    lastMessage: "You guys go ahead.😄",
    timestamp: "12:25",
    unread: 999,
  },
  {
    id: 62,
    name: "Jerome White",
    profile_pic: loginDoggy,
    lastMessage: "i can't come to play today.",
    timestamp: "12:25",
    unread: 0,
  },
  {
    id: 443,
    name: "Madagascar Silver",
    profile_pic: default_profile,
    lastMessage: "AAAAAAAAARRRRRR!!!!",
    timestamp: "12:25",
    unread: 999,
  },
  {
    id: 42,
    name: "Jerome White",
    profile_pic: loginDoggy2,
    lastMessage: "Whatever man",
    timestamp: "12:25",
    unread: 0,
  },
  {
    id: 33,
    name: "Madagascar Silver",
    profile_pic: profile_bg,
    lastMessage: "Sure",
    timestamp: "12:25",
    unread: 999,
  },
  {
    id: 22,
    name: "Jerome White",
    profile_pic: profile_bg2,
    lastMessage: "......",
    timestamp: "12:25",
    unread: 0,
  },
  {
    id: 13,
    name: "Madagascar Silver",
    profile_pic: loginDoggy,
    lastMessage: "YOOOOO",
    timestamp: "12:25",
    unread: 999,
  },
];

export default chats;

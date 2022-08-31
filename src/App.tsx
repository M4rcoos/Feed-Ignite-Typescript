import { Header } from "./components/Header.jsx";
import { Post } from "./components/Post.jsx";
import { Sidebar } from "./components/Sidebar.jsx";

import styles from "./App.module.css";
import "./global.css";

function App() {
  
  const posts = [
    {
      id: 1,
      author: {
        avatarUrl: "https://avatars.githubusercontent.com/u/89174923?v=4",
        name: "Marcos Vinicius",
        role: "Web developer",
      },
      content: [
        { type: "paragraph", content: "Fala galeraa 👋" },
        {
          type: "paragraph",
          content:
            "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
        },
        { type: "link", content: "👉 jane.design/doctorcare" },
      ],
      publishedAt: new Date ("2022-8-29-12:00:00"),
    },
    {
      id: 2,
      author: {
        avatarUrl: "https://github.com/maykbrito.png",
        name: "Mayke bryto",
        role: "Educator @Rocketseat",
      },
      content: [
        { type: "paragraph", content: "Fala galeraa 👋" },
        {
          type: "paragraph",
          content:
            "Acabei de subir um conteudo na plataforma da Rocket ta muito massa! 🚀",
        },
        { type: "link", content: "jane.design/doctorcare" },
      ],
      publishedAt: new Date ("2022-8-29-14:00:00"),
    },
  ];
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return( <Post 
            key={post.id}  
            author = {post.author}
            content = {post.content}
            publishedAt={post.publishedAt}
            />)
          })}
        </main>
      </div>
    </>
  );
}

export default App;

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";

interface Author {
  name:string,
  role:string,
  avatarUrl:string
}
interface Content{
  type:'paragraph'| 'link';
  content:string
}
interface PostProps{
  author:Author,
  publishedAt: Date,
  content: Content[]
}


export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(['Muito bacana esse post!']);
  const [newCommentText, setNewCommentText] = useState('')

  //ultilizando lib para formatação de data
  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );
  //esta recebendo a função que ira verificar a data que foi publicada relativa a data atual!
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    //coloca um verbo do passado relativo a data que foi publicado
    addSuffix: true,
  });
 //função adiciona um comentario
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText ('')
  }
//função pega o valor da textarea e atribui no comentario
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')

    setNewCommentText(event.target.value)
  }
  //função verifica se o campo textarea está vazio e se estiver ira retorna a mensagem!
  function handleNewCommentInvalid (event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('esse campo e obrigatorio')
  }
//função deleta um comentario
  function deleteComment(commentToDelete:string){

    const commentWithoutDeleteone = comments.filter(comment=>{
      return commentToDelete!=comment
    })
    setComments(commentWithoutDeleteone)
  }
  const isNewCommentEmpty = newCommentText.length === 0
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {/* verificando o conteudo do post e renderizando em tela conforme a condição  */}
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p  key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea name="comment" 
        placeholder="Deixe um comentário"
        value={newCommentText}
        onChange={handleNewCommentChange}
        onInvalid={handleNewCommentInvalid}
        required
         />

        <footer>
          <button 
          type="submit" 
          disabled={isNewCommentEmpty}>Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (<Comment 
            key={comment} 
            content={comment}  
            onDeleteComment = {deleteComment}
          />);
        })}
      </div>
    </article>
  );
}

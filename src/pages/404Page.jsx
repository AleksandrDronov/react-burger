import React from "react";
import image from "../images/404page.png";
import styles from "./404Page.module.css"

export default function ErrorPage() {
  return(
    <div className={styles.container}>
      <img src={image} alt="404" className={styles.image}/>
      <p className="text text_type_main-medium">Такой страницы не существует</p>
    </div>
  )
}

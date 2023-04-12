import { ChangeEvent, useState } from "react";
import styles from "../styles/page.module.css";
import { OffenseDetector } from "../services/security/OffenseDetector";
import { specialJoin } from "../utils/specialJoin";
import { Roboto } from "next/font/google";
import Head from "next/head";

const inter = Roboto({ 
  subsets: ["latin"], 
  weight: ["300", "400","500"] 
});

function MainPage() {
  const [offenses, setOffenses] = useState([]);

  function onChangeTextarea(event: ChangeEvent<HTMLTextAreaElement>) {
    const offensesDetected = OffenseDetector.verify(event.currentTarget.value);
    setOffenses(offensesDetected);
  };

  const hasOffense = offenses.length >= 1;
  const hasManyOffenses = offenses.length >= 2;
  const pluralOfWords = hasManyOffenses && "s";

  const mainContainerClassName = [inter.className, styles.container].join(" ");

  return (
    <main className={mainContainerClassName}>
      <Head>
        <title>Detector de conteúdo ofensivo</title>
      </Head>
      <h1>Detector de conteúdo ofensivo</h1>
      <h4>Por: <a href="https://github.com/l-marcel" target="__blank__">Lucas Marcel Silva de Brito</a></h4>
      <textarea 
        placeholder="Digite o seu texto aqui e verificaremos se ele é ou não um texto ofensivo." 
        onChange={onChangeTextarea}
      />
      {hasOffense && <p>
        Nós detectamos uma linguagem ofensiva em seu texto.
        Por favor, verifique o uso 
        dessa{pluralOfWords} palavra{pluralOfWords}/frase{pluralOfWords}: {specialJoin(offenses)}.
      </p>}
    </main>
  );
};

export default MainPage;
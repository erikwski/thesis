# Tesi di Laurea di Ferrari Erik
Questo repository contiene il materiale relativo alla tesi di laurea di Ferrari Erik. Di seguito sono fornite informazioni dettagliate sul contenuto del repository, le istruzioni per la compilazione e l'esecuzione del codice, nonché le risposte alle domande frequenti.

Contenuto del Repository

`/src`: Contiene il codice sorgente del progetto.
- `/app`:
  - `/components`: Contiene i componenti di UI
  - `/models`: Contiene le interfaccie e costanti utilizzate
  - `/pages`: Contiene le pagine principali dell'applicazione
  - `/services`: Contiene i servizi usati dall'applicazione con la quale si interfacciano principalmente gli store
  - `/store`: Contiene lo store global, store dei componenti e custom feature basate su **ngrx/signal-store**
- `/assets`: Contiene i file statici del progetto
    - `/assembly`: Dove vengono prodotti gli output della build del codice **assemblyScript**
- `/environments`: Variabili di ambienti per raggiungere il Backend


## Dove visualizzare il progetto in esecuzione?:
Il progetto é agganciato ad un automatismo creato con [Vercel](https://vercel.com/) dove ad ogni commit sul branch master effettua una nuova build e la deploya all'URL [thesis-ten-beta.vercel.app](https://thesis-ten-beta.vercel.app/)

## Come avviare il progetto in locale:
- Clonare il progetto con il comando: `git clone https://github.com/erikwski/thesis.git`
- Installare le dipendenze: `npm i`
- Avviare tramite il comando start: `npm run start`

## Obiettivo del progetto
Basandomi sulla [traccia](https://ita01-prod.s3.eu-south-1.amazonaws.com/platform-data/thesis/project-work/attachments/215/1715016111.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmV1LXNvdXRoLTEiRzBFAiEAi8gLIKMQ0ILjQPT1nzVDXITPtA8pU7rPlpEwxvdhPj8CIFXEekoz5LhHenwAaT6o1bomZKgjeSVc8krCUdxWrSpbKvcDCPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTQyMTU5NzE0MTU5IgzOQ4kWUKPkAo6IdgUqywMxecAfsJzfl7mmP3tL%2F7iFye951%2FdSRDchBADbIS192BWTGo8WEtrEPLV06e1HTMSdTV0RQCn8hkdby2Qe%2BojTyfPc%2FcSzOpTvojIG7tU1xxgM5tzxJT5CDkwgzjEb1VmcZWFt%2F65LsKmAxgBGXaCOrRIVUOSZy0c5zxEkybUvQKDcmARglaHTG3XTyx0iWqCPhsqLUzHLGVMOwL4IguLiPn0dHzHPktOeXNGQQIyt7e5P9dLPUWybq99uy7%2BllrGZ%2B85nMq4VhA1CgpFYxsHyEVeoYZuMF%2Fe5J%2FrXj6g8H9CJ3fbFGrz706OMCbrASWSVVnCWDN8oMD70UyQ%2B2pctCf8bgXCcBYBh21c64g%2BcntS9NyDveEklp58eebPmxmPsHYBrvT%2FDg%2FTxhz%2B1USG49VTu%2BbiswlMQlkduxOq86xqRN1DOf0KGWf6PZj4DqzbV4bhV2ccuAcV4Hj%2F7PrebSJHH%2B%2F8KFhZOxg%2FlU%2FIHsuiv1%2Fu9mK2KltgHR%2F%2BHh7%2B%2Bmp8q0inuZh269buWRoLJ2CGs2W4GiU76dx6Fa%2B%2B4e%2FezeSkqg8AUmIyNfv5reofASVagr3yFOP4oi3FOL7%2FmKO7SjXux%2BA6%2FioMw5IHKvAY6pQE0prGyuNVD2K%2FSX2aqIyHfytMeMsrmSt7c4wIYnZxxKdorBD6DXYd%2BwCYEGIsRYnLncwzxSL25Aa2vroDbDMuUQlHwpKTyjSVasjvRIf384i93VO1GQC8dEJWSX8wckKP7HOx9wK3wpsnFf2wcbWcRYTfQMPami86zlSCtAgGqKRRJdd%2FIBkOVXqb8D5kuz2F%2BlkgXToA0GGhFZSChSjFLeCGKVlY%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIASCGLBC5XXBEEWLJ7%2F20250123%2Feu-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250123T174954Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=def6ee3318379455338cbeff46549efb96287c59859a6eb2a1ecc0f85b95bada) scelta, l'obiettivo é quello di creare un gestionale di magazzino di prodotti utilizzabile dai dipendenti dove possono andare a creare nuovi prodotti e inoltre ottenere alcuni dati legati ad essi e consultarne lo storico.

Obiettivo personale era quello di comprendere l'utilitá di **webAssembly** per svolgere calcoli live e in quantitá importanti e familiarizzare con una delle piú recenti librerie in uso su Angular ovvero **signal-store**


Contatti
Per ulteriori informazioni, trovi tutti i contatti sul mio profilo.

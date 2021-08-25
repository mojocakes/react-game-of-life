import Head from 'next/head'
import GameOfLife from '../components/GameOfLife';

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Game of Life</title>
      </Head>
      <section>
          <GameOfLife />
      </section>
    </>
  )
}

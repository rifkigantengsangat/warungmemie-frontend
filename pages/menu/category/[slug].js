import axios from "axios";
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import useSWR from "swr";
export default function CategoryDetail({ result }) {
  const {query} = useRouter();
   
  return (
    <div>
      <h1>{query.slug}</h1>
      {result?.map((e, i) => {
        return (
          <div key={i}>
            {e?.menus?.map((e, i) => {
              return (
                <div key={i}>
                  <h1>{e?.nama}</h1>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export async function getStaticPaths() {
  const { data } = await axios.get("http://localhost:8000/api/category");
  console.log(data);
  const paths = data.map((category) => ({
    params: {
      slug: category?.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { slug } = params;
  const { data } = await axios.get( "http://localhost:8000/api/category/"+slug);
  const result = data.data;
  return {
    props: {
      result,
    },
  };
}

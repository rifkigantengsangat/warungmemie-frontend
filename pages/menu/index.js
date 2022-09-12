import axios from "axios";
import {useRouter} from 'next/router'
import useSWR from "swr";
import Link from 'next/link'

export default function Menu({ data }) {
const router = useRouter();
  return (
    <div className="w-full h-screen bg-[#EEF2FF]">
    <div className='flex flex-row w-full h-12'>
        {
            data.map((e,i)=>(
                <div key={i}>
                    <h1>{e.name_category}</h1>
                    <Link
          href={{
            pathname: '/menu/menu-category',
            query: { slug: e.slug },
          }}
        >
          <a>Blog Post</a>
        </Link>
                </div>
            )
            
            )
        }
    </div>
    </div>
  );
}
export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:8000/api/category");
  console.log(data);

  return {
    props: { data },
  };
}

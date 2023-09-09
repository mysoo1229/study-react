import Seo from "@/components/Seo";
import { useRouter } from "next/router"

export default function Detail({ params }) {
  const [title, id] = params || [];

  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

// to not have loading and get server side rendered info
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  }
}

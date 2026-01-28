import { redirect } from "next/navigation";

export default function ExperienceLegacyRedirect({ params }) {
  redirect(`/experiences/${params.slug}`);
}

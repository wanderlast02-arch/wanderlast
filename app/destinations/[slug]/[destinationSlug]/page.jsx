import DestinationDetailPage from "../../../destination/[countrySlug]/[destinationSlug]/page";

export default function CountryDestinationPage({ params }) {
  return (
    <DestinationDetailPage
      params={{ countrySlug: params.slug, destinationSlug: params.destinationSlug }}
    />
  );
}

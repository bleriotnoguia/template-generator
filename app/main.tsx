import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";

export default function Main() {
  return (
    <main className="flex-1 p-4 overflow-x-hidden overflow-scroll">
      <NavBar />
      <div className="bg-gray-700 p-6 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            EMAIL MARKETING PRACTICES TO GENERATE INCREASE IN SALES
          </h1>
          <p className="text-gray-400">
            Software as a service click-to-call post event feedback social media
            marketing authority vendor analysis Zoom request.
          </p>
        </div>
        <div className="relative mb-6">
          <div className="absolute top-0 left-0 w-full h-full border-2 border-dashed border-purple-600" />
          <img
            src="/placeholder.svg"
            alt="Marketing Image"
            className="w-full h-auto"
            width="600"
            height="300"
            style={{ aspectRatio: "600/300", objectFit: "cover" }}
          />
        </div>
        <p className="text-center text-gray-400 mb-6">
          Hosted dialer consumer show traffic flow Marketo customer journey
          content experience tags content management system marketing funnel
          domain name server pre event feedback enterprise resource planning.
          Domain authority session weighted pipeline content management system
          bounce rate social media.
        </p>
        <div className="text-center">
          <Button variant="default" className="bg-purple-600">
            Read more
          </Button>
        </div>
      </div>
    </main>
  );
}

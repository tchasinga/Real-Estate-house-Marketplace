import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="getText py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        About LandEstate more details
      </h1>
      <p className="mb-3 text-slate-700">
        A land estate typically refers to a large area of land that is planned
        and developed for residential or commercial purposes. These estates are
        designed to accommodate a community, providing space for housing,
        amenities, and infrastructure. The purpose of a land estate is
        multifaceted, encompassing both economic and social objectives.
      </p>

       <p className="mb-3 text-slate-700">
        Primarily, land estates aim to address the growing demand for housing by
        efficiently utilizing available land resources. Developers plan and
        divide the land into plots, creating a structured layout that includes
        residential lots, green spaces, roads, and public facilities. This
        organization facilitates urban planning and promotes sustainable
        development practices.
      </p>

       <p className="mb-3 text-slate-700">
        Land estates play a crucial role in fostering community growth and
        cohesion. By incorporating amenities such as parks, schools, shopping
        centers, and recreational facilities, these estates contribute to the
        creation of vibrant and self-sustaining communities. This not only
        enhances the quality of life for residents but also attracts prospective
        homebuyers and investors.
      </p>

       <p className="mb-3 text-slate-700">
        From an economic perspective, land estates stimulate local economies.
        The construction and development activities generate employment
        opportunities, and the subsequent influx of residents can boost local
        businesses. Additionally, property values in well-planned land estates
        tend to appreciate over time, providing a positive economic impact for
        homeowners and the surrounding area. In essence, the purpose of a land
        estate is to create a harmonious blend of residential, commercial, and
        recreational spaces that cater to the needs of a diverse and growing
        population. Through thoughtful planning, infrastructure development, and
        community engagement, land estates contribute to the overall progress
        and sustainability of urban areas.
      </p>
      <div className="bg-slate-700 p-4 w-full flex text-white font-normal justify-center gap-3">
         <p>This mern-stack projects was build from scratch  @2022-2023 by </p>
         <Link to={`https://github.com/tchasinga`}>tchasingajacques</Link>
      </div>
    </div>
  );
}

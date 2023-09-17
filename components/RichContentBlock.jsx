import React from 'react'

const RichContentBlock = ({content}) => {
  return (
    <div className="richcontent" dangerouslySetInnerHTML={{__html: content}}>
    </div>
  );
}

export default RichContentBlock

{/* <h1>heading 1</h1>
      <p>
        This Teenage Life was founded and is run by a team of inspiring
        teenagers and an adult named Molly Josephs. They came together while
        Molly was working at a project-based high school called High Tech High
        in San Diego, California. Molly has spent the past decade teaching
        middle and high school biology and computer science, and designing
        project-based curricula. Since studying biology at Brown University and
        school leadership at Harvard’s Graduate School of Education, she’s
        worked in independent, public district, and public charter schools
        including High Tech High, The Dalton School, Codman Academy, and The
        Healey School. She also spent three years on a team working to start a
        new kind of in-district, project-based high school called Powderhouse
        Studios.
      </p>
      <h2>heading 2</h2>
      <p>
        This Teenage Life was founded and is run by a team of inspiring
        teenagers and an adult named Molly Josephs. They came together while
        Molly was working at a project-based high school called High Tech High
        in San Diego, California. Molly has spent the past decade teaching
        middle and high school biology and computer science, and designing
        project-based curricula.
      </p>
      <h3>heading 3</h3>
      <p>
        This Teenage Life was founded and is run by a team of inspiring
        teenagers and an adult named Molly Josephs. They came together while
        Molly was working at a project-based high school called High Tech High
        in San Diego, California. Molly has spent the past decade teaching
        middle and high school biology and computer science, and designing
        project-based curricula.
      </p>
      <h4>heading 4</h4>
      <p>
        This Teenage Life was founded and is run by a team of inspiring
        teenagers and an adult named Molly Josephs. They came together while
        Molly was working at a project-based high school called High Tech High
        in San Diego, California. Molly has spent the past decade teaching
        middle and high school biology and computer science, and designing
        project-based curricula.
      </p> */}
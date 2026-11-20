import CourseMap from "@/components/CourseMap";

export default function MapPage() {
  return (
    <>
      <h1>Course map</h1>
      <p className="lead">Math, physics, statistics and CS courses by level, with prerequisite arrows. Mark what you have taken; colors update. Choose a plan to fade everything outside it.</p>
      <div style={{ width: "min(1560px, 96vw)", position: "relative", left: "50%", transform: "translateX(-50%)" }}>
        <CourseMap />
      </div>
    </>
  );
}

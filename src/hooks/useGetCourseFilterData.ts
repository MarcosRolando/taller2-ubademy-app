import React, { useEffect } from "react"
import { getCourseFilterData } from "../scripts/course";

export const useGetCoursesFilterData = () => {
  const [courseTypes, setCourseTypes] = React.useState([]);
  const [subTypes, setSubTypes] = React.useState([]);
  useEffect(() => {
    (async () => {
      const { _courseTypes, _subTypes } = await getCourseFilterData();
      setCourseTypes(_courseTypes);
      setSubTypes(_subTypes);
    })();
  })
  return { courseTypes, subTypes };
}

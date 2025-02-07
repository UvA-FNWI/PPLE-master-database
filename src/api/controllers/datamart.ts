import programmes from "../store/dataset.json";
import locations from "../store/locations.json";
import School from "../../models/School";

const locationMap = Object.fromEntries(locations.map(l => [l.School, l]));

export default class DatamartController {

  public static getData = (school?: string): School[] => {
    let data = programmes.sort((a, b) =>
      (a.programme || "").localeCompare(b.programme || "")).filter(p => p.programme !== null)

    if (school) {
      data = data.filter(
        x => x.school.toLowerCase().includes(school.toLowerCase())
      );
    }

    data = data.filter(
      x => x.field !== "Unspecified"
    )

    return data;
  }

  public static getLocations = () => {
    return locationMap;
  }

  public static getLocation = (name: string) => {
    if (!Object.keys(locationMap).includes(name)) return null;
    return (locationMap as any)[name];
  }

  public static getSchools = () => {
    return Object.keys(locationMap);
  }
}
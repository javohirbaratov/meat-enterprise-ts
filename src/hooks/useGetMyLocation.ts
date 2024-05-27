import { toast } from "react-toastify";

interface IGetLocation {
  latitude: number | null;
  longitude: number | null;
}

const useGetMyLocation = () => {
  // Handle get location
  function handleGetLocation(): Promise<IGetLocation> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.info("Sizning manzilingiz olindi");
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          toast.error("Sizning manzilingiz olinmadi");
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    });
  }

  return [handleGetLocation];
};

export default useGetMyLocation;

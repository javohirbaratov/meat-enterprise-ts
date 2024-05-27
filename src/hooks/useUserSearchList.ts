import { useCallback } from "react";

function useUserSearchList() {
  const handleSearch = useCallback(
    <Type>(data: Type[], search: string): Type[] => {
      return data.filter((item) => {
        let key: keyof Type;
        for (key in item) {
          let val = "";
          if (typeof item[key as keyof Type] === "string") {
            val = item[key as keyof Type] as string;
          }else if(typeof item[key as keyof Type] === "number") {
            val = (item[key as keyof Type] as number).toString();
          }

          if (
            val.toLowerCase().includes(search.toLowerCase()) &&
            key !== "to" &&
            key !== "id" &&
            key !== "key"
          ) {
            return item;
          }
        }
        return false;
      });
    },
    []
  );

  return [handleSearch];
}

export default useUserSearchList;

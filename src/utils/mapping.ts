// utils/mapping.ts
export function mapRawToDto(rawData: any): any {
  return rawData?.map((item: any) => ({
    state_id: item?.f0,
    name: item?.f1,
    alpha_code: item?.f2,
    country_id: item?.f3,
    country_name: item?.f4,
  }));
}

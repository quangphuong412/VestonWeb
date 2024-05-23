import db from '@/app/(api)/db/db';

export const searchBranch = async (
  area_id,
  area_name,
  city,
  country,
  cre_usr_id,
  upd_usr_id,
  del_yn
) => {
  var theQuery = `select area_id, area_name, city, country, cre_usr_id, cre_dt, upd_usr_id, upd_dt, del_yn from mdm_branch where 1 = 1`;
  var theValues = [];

  return (await db).query(theQuery, theValues);
};

import db from '@/app/(api)/db/db';

export const insertBranch = async (
  area_id,
  area_name,
  city,
  country,
  cre_usr_id,
  upd_usr_id,
  del_yn
) => {
  var theQuery = `INSERT INTO mdm_branch area_id, area_name, city, country, cre_usr_id, cre_dt, upd_usr_id, upd_dt, del_yn) 
  VALUES ($1,$2,$3,$4,$5,current_date,$6,current_date,$7);`;
  var theValues = [area_id, area_name, city, country, cre_usr_id, upd_usr_id, del_yn];

  return (await db).query(theQuery, theValues);
};

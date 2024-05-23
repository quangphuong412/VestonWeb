import db from "@/app/(api)/db/db";

export const getUserByName = async ({usrname}) => {

    var theQuery = "select usrid, password, usrname, usr_email, role, position from mdm_account where usrname = $1";
    var theValues = [
        usrname
    ];
    return await db.query(
        theQuery,
        theValues
    )
}
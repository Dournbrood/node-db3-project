const db = require('../data/dbConfig');

module.exports = {
    find,
    findByID,
    findSteps,
    add,
    update,
    remove
};

function find() {
    // Resolves to an array of ALL schemes in the database... 
    /* 
        select s.* from schemes as s
    */
    return db("schemes as s").select("s.*");
}

function findByID(id) {
    // Resolves to the scheme with the specified ID.
    /* 
        select s.* from schemes as s where s.id = 3
    */
    return db("schemes as s").select("s.*").where("s.id", "=", id);
}

function findSteps(schemeID) {
    //Resolves to an array of steps if a scheme with the given ID is found.
    /* 
        select st.id, st.instructions 
        from steps as st
        join schemes as sc
        on st.scheme_id = sc.id
        where sc.id = schemeID
    */
    return db("steps as st")
        .join("schemes as sc", "st.scheme_id", "sc.id")
        .where("sc.id", schemeID)
        .select("st.id as schemeID", "st.instructions as instructions");
}

function add(newScheme) {
    return db("schemes").insert(newScheme);
}

function update(changes, id) {
    return db("").where("id", "=", id).update(changes);
}

function remove(id) {
    return db("schemes").where("id", "=", id).delete();
}
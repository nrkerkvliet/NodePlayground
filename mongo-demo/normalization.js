// Trade off between query performance vs consistency

// Using References (Normalization) -> CONSISTENCY (if author changes it only changes in one place)
let author = {
    name: 'Nate'
}


    // author id "references" author
let course = {
    author: 'id'
}



// Using Embedded Documents (Denormalization) -> PERORMANCE (author and course are loaded with single query) -> change in author will have to change EVERY course with that author.. 
    // if something goes wrong with the update there will be data inconsisctency
let courseEmbedded = {
    author: {
        name: 'Nate'
    }
}


// Hybrid Approach - Can get snapshot of author name at time of document creation.  Deosnt matter if author name changes because its snapshotted on the course document
let authorHybrid = {
    name: 'Nate'
    // 50 other properties
}

let courseHybrid = {
    author: {
        id: 'ref',
        name: 'Nate'
    }
}
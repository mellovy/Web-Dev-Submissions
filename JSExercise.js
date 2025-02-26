function search(StudentID){
    var highest=0;

    for(let i=0; i<10; i++){
        if(StudentID[i].Grade>highest){
            highest = StudentID[i].Grade;
        }
    }

    return highest;
}

const StudentID=[
    {
        Name:"Diego",
        IDnum:101010,
        Year:2020,
        Grade:90,
    },
    {
        Name:"Marie",
        IDnum:121212,
        Year:2020,
        Grade:80,
    },
    {
        Name:"Kyle",
        IDnum:140140,
        Year:2020,
        Grade:85,
    },
    {
        Name:"Dora",
        IDnum:150150,
        Year:2020,
        Grade:95,
    },
    {
        Name:"Matilda",
        IDnum:210120,
        Year:2020,
        Grade:97,
    },
    {
        Name:"Chan",
        IDnum:410410,
        Year:2020,
        Grade:90,
    },
    {
        Name:"Mark",
        IDnum:520203,
        Year:2020,
        Grade:93,
    },
    {
        Name:"John",
        IDnum:540340,
        Year:2020,
        Grade:60,
    },
    {
        Name:"Blake",
        IDnum:459349,
        Year:2020,
        Grade:98,
    },
    {
        Name:"Louis",
        IDnum:453345,
        Year:2020,
        Grade:99,
    },

];

var highest = search(StudentID);

for(let i=0; i<10; i++){
    if(StudentID[i].Grade==highest){
        console.log("Student with Highest Grade:", StudentID[i]);
        break;
    }
}

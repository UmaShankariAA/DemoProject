const path = require('path');
const XLSX = require('xlsx');
const parseMasterData = () => {
  try {
    const projectRoot = path.resolve(__dirname, './');
    const absolutePath = path.join(projectRoot, process.env.masterFilePath);
    const fileContent = require('fs').readFileSync(absolutePath, 'binary');
    const workbook = XLSX.read(fileContent, { type: 'binary' });
    var data =  XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1']);
    const masterData = {};

    // initializing keys for masterData
    data.forEach((row)=>{
        if(masterData.hasOwnProperty(row["TestGroup"])===false){
          masterData[row["TestGroup"]]= []
        }
    })

    // filtering based on execution for yml files in github Actions
    if(process.env.hasOwnProperty("Execution"))
    {
      data = data.filter((row)=>{ 
        return String(row["Execution"]).replace(" ","").split(",").includes(process.env.Execution);
      })
    }
    
    //mapping values based on TestGroup for masterdata
    data.forEach((row)=>{
        masterData[row["TestGroup"]].push(row["TestCase"])
    })
    data = masterData;

    // Write the parsed master data to a JSON file
    const jsonOutputPath = path.join(projectRoot, './cypress/fixtures/testData.json');
    require('fs').writeFileSync(jsonOutputPath, JSON.stringify({ success: true, data: masterData }, null, 2));

    // Return the parsed master data
    return { success: true, data: masterData, outputPath: jsonOutputPath };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

const result = parseMasterData();
console.log(result)
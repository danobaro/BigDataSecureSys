import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, 
  Legend,AreaChart,ResponsiveContainer, Area, CartesianGrid, Bar,
} from "recharts";



function Chart() {
const data = [
    { name: "Allergies", users: 300 },
    { name: "Colds and Flu", users: 987 },
    { name: "Malaria", users: 1345 },
    { name: "Meningitis", users: 490 },
    { name: "HIV/AIDS", users: 340 },
    { name: "Cancer", users: 50 },
  ];
  return (
    <div className='p-7 ' >
        <div className="container mx-auto  flex justify-center ">
          <div style={{ textAlign: "center" }}>
          <div className='text-white bg-dark-purple'>
          <h1 className='heading uppercase text-2xl text-center pb-10 pt-5'>Patient Stat</h1>
          </div>
              <div className="chart bg-white h-80">
                <PieChart width={400} height={400}>
                  <Pie dataKey="users" isAnimationActive={false}  data={data}  cx={200}  cy={200} outerRadius={80} fill="#8884d8" label/>
                  <Tooltip />
                </PieChart>
                <BarChart  width={500}  height={250} data={data} margin={{top: 5, right: 30, left: 80, bottom: 5, }} barSize={20}>
                  <XAxis  dataKey="name" scale="point" padding={{ left: 10, right: 10 }}          />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
                </BarChart>
                <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart  data={data} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
              </div>
          </div>
        </div>  
      </div>
  )
}
export default Chart
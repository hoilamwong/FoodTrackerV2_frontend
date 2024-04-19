import { useSelector } from "react-redux"
import { selectAllFoods } from "../foods/foodsApiSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const allFoods = useSelector(state => selectAllFoods(state))

  const expiringFoodDataSet = [
    allFoods.filter(food => food.days_until_expiration <= 0).length,
    allFoods.filter(food => food.days_until_expiration > 0 && food.days_until_expiration <= 5).length,
    allFoods.filter(food => food.days_until_expiration > 5 && food.days_until_expiration <= 14).length,
    allFoods.filter(food => food.days_until_expiration > 14).length,
  ]

  const options = {
    plugins: {
      legend: {
          // display: false,
          labels: {
              color: 'rgb(255, 99, 132)'
          },
          position: 'bottom'
      }
  }
  }
  // let content = allFoods.slice(0,3).map(f => <div key={f._id}>{f.name}</div>)
  return (
    <div className="py-4">
      <Doughnut
        options={options}
        data={{
          labels: [
            '<= 0 Day',
            '<= 5 Days',
            '<= 14 Days',
            '> 14 Days'
          ],
          datasets: [{
            label: 'Number of Items',
            data: expiringFoodDataSet,
            backgroundColor: [
              '#fb7185',
              '#fb923c',
              '#fbbf24',
              '#16a34a'
            ],
            hoverOffset: 20,
            hoverBorderWidth: 5,
            radius: '90%',
            legend: 'bottom',
          }]
        }}
      />
    </div>
  )
}

export default DonutChart

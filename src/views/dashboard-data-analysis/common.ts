export const EChartsOptionsGenerator = {
  legend: (data: string[]) => (
    {
      borderWidth: 0,
      itemHeight: 15,
      itemWidth: 15,
      data: data,
      itemGap: 16,
      itemStyle: {
        borderWidth: 0
      },
      textStyle: {
        color: '#1F2733',
        fontSize: 14
      },
      icon: 'roundRect',
      lineStyle: {
        opacity: 0
      }
    }
  )
}

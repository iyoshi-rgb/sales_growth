import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface Props{
  title : string;
  description : string;
  data : number | undefined;
}


  export function DataCard({
    title,
    description,
    data }: Props){

    return(
    <Card className='w-[280px]'>
      <CardHeader>
        <div className='flex items-center'>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
        <CardContent className='font-bold text-4xl '>
          <div className='text-center'>{data}件</div>
        </CardContent>
        <CardDescription className='text-gray-400 pl-3 pb-3'>
          {description}
        </CardDescription>
    </Card>
  )
  
}
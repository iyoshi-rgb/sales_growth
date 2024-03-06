import React from 'react'

interface Props{
    id: number,
    created_at: string,
    client: string,
    phone: string,
    person: string,
    status: string,
    accept: boolean,
    hot: boolean,
}

const List : React.FC<Props> = ({id,created_at,client,phone,person,status,accept,hot}) => {

    //console.log({id,created_at,client,phone,person,status,accept,hot});
  return (
    <div>
    <div className="justify-between">
        <div className="flex-1 text-center">{created_at}</div>
        <div className="flex-1 text-center">{client}</div>
        <div className="flex-1 text-center">{phone}</div>
        <div className="flex-1 text-center">{person}</div>
        <div className="flex-1 text-center">{status}</div>
        <div className="flex-1 text-center">{accept ? 'true': 'false'}</div>
        <div className="flex-1 text-center">{hot ? 'true':'false' }</div>
    </div>

    </div>
  )
}

export default List

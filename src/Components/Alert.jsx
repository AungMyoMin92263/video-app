import { Alert } from '@chakra-ui/react'
import React from 'react'

const AlertMsg = ({ status, icon, msg }) => {
    return (
        <Alert status={`${status ? status : 'info'}`}>
            {icon}
            {msg}
        </Alert>
    )
}

export default AlertMsg
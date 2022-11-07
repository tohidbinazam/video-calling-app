import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { BsMicFill, BsFillCameraVideoFill } from "react-icons/bs";
import { MdScreenShare } from "react-icons/md";
import { FiPhoneCall, FiPhoneOff } from "react-icons/fi";
import { useState } from 'react';
import { useRef } from 'react';
import io from "socket.io-client"
import './Room.css'


const socket = io()
const Room = () => {
    
    const [ stream, setStream ] = useState()
    const [ color, setColor ] = useState({
        mic : 'primary',
        cam: 'primary',
        scr : 'success',
        delete: socket
    })
    const myVideo = useRef()
    
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video:true, audio:true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })
        
    }, [])


    const handleMic = () => {
        if (color.mic === 'primary' ) {
            setColor((prev) => ({...prev, mic: 'danger'}))
            stream.getAudioTracks()[0].enabled = false
        } else {
            setColor((prev) => ({...prev, mic: 'primary'}))
            stream.getAudioTracks()[0].enabled = true
        }
    }

    const handleCam = () => {
        if (color.cam === 'primary' ) {
            setColor((prev) => ({...prev, cam: 'danger'}))
            stream.getVideoTracks()[0].enabled = false
        } else {
            setColor((prev) => ({...prev, cam: 'primary'}))
            stream.getVideoTracks()[0].enabled = true
        }
    }

    const handleScreen = () => {
        if (color.scr === 'success' ) {
            setColor((prev) => ({...prev, scr: 'secondary'}))
        } else {
            setColor((prev) => ({...prev, scr: 'success'}))
        }
    }

  return (
    <div className='my-5'>
        <Container>
            <Row>
                <Col md='8'>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md='6'>
                                    <video className='w-100' playsInline autoPlay ref={myVideo} />
                                </Col>
                                <Col md='6'>
                                    <video className='w-100' playsInline autoPlay/>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className='d-flex justify-content-between'>
                            <div className="w-25 text-start">
                                <Button size='lg' className='me-2' onClick={ handleMic } variant={color.mic}> <BsMicFill /> Mic </Button>
                                <Button size='lg' onClick={ handleCam } variant={color.cam}> <BsFillCameraVideoFill /> Cam </Button>
                            </div>
                            <div className="w-50 text-center">
                                <Button size='lg' onClick={ handleScreen } variant={color.scr}> <MdScreenShare /> Screen share </Button>
                            </div>
                            <div className="w-25 text-end">
                                <Button variant='danger' size='lg'> <FiPhoneOff /> End Call </Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md='4'>
                    <Card>
                        <Card.Header>
                             <h3>Call a Friend</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form.Control type='text' placeholder='Give your name'/>
                            <Form.Control type='text' placeholder='ID to call'/>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>
                            <h3>Call a Friend</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form.Control type='text' placeholder='FNF Name or Email'/>
                            <hr />
                            <div className="all-fnf">
                                    <Card bg='primary'>
                                        <Card.Body className="fnf">
                                            <div className="user">
                                                <h4>Tohid Bin Azam</h4>
                                                <b>Active</b>
                                            </div>
                                            <div className="status">
                                                <Button size='lg' variant='dark'> <FiPhoneCall /> Call Now</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Room
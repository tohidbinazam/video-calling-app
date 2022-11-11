import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { BsMicFill, BsFillCameraVideoFill } from "react-icons/bs";
import { MdScreenShare } from "react-icons/md";
import { FiPhoneOff } from "react-icons/fi";
import { useState } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loggedOut } from '../../redux/auth/action';
import Peer from 'simple-peer'
import io from "socket.io-client"
import './Room.css'


const socket = io()
const Room = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    
    const [ me, setMe ] = useState()
    const [ call, setCall ] = useState({
        status : true,
        isCalling: false,
        isAccepted: false
    });
    const [ caller, setCaller ] = useState({
        name : '',
        callerId: '',
        callerSignal: ''
    })
    const [ users, setUsers ] = useState([])
    const [ stream, setStream ] = useState()
    const [ color, setColor ] = useState({
        mic : 'primary',
        cam: 'primary',
        scr : 'success'
    })
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    
    useEffect(() => {
        socket.emit("me", user._id )

        navigator.mediaDevices.getUserMedia({ video:true, audio:true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })

        axios.get('/api/v1/user').then(res => {
            socket.emit('users', res.data)
        }).catch((error) => {
            console.log(error);
        })
        
        socket.on("callUser", (data) => {
            console.log();
            setCall(prev => ({ ...prev, status : false, isCalling : true }))
			setCaller({
                name : data.name,
                callerId: data.from,
                callerSignal: data.signal
            })
		})
    }, [user._id])

    socket.on('users', (users) => {
        setUsers(users)
        setMe(users.find(data => data._id === user._id))
    })

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
    
    // Handle Screen
    const handleScreen = () => {
        if (color.scr === 'success' ) {
            setColor((prev) => ({...prev, scr: 'secondary'}))
        } else {
            setColor((prev) => ({...prev, scr: 'success'}))
        }
    }

    // Call a FNF
    const handleCall = (id) => {
        const peer = new Peer({
            initiator: true,
			trickle: false,
            // config: {
            //     iceServers: [
            //         {
            //         urls: "stun:numb.viagenie.ca",
            //         username: "sultan1640@gmail.com",
            //         credential: "98376683"
            //     },
            //     {
            //         urls: "turn:numb.viagenie.ca",
            //         username: "sultan1640@gmail.com",
            //         credential: "98376683"
            //     }
            // ]},
            stream: stream,
        })
        peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me.callId,
				name: me.name
			})
		})

        socket.on("callAccepted", (signal) => {
            setCall({ status : false, isAccepted : true, isCalling : false })
			peer.signal(signal)
		})

        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream
        })

        connectionRef.current = peer
    }

    const handleAnswer = () => {
        setCall({ status : false, isAccepted : true, isCalling : false })
        const peer = new Peer({
            initiator: false,
            trickle: false,
			stream: stream,
        })
        peer.on('signal', (data) => {
            socket.emit("answerCall", { signal: data, to: caller.callerId })
        })

        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(caller.callerSignal)

        connectionRef.current = peer
    }

    const handleEndCall = () => {
		connectionRef.current.destroy()
		setCall(prev => ({ ...prev, status : true, isAccepted : false}))
	}

    // Log out and remove cookie
    const handleLogOut = (e) => {
        e.preventDefault()

        axios.delete('api/v1/user/logout').then(() => {
            dispatch(loggedOut())
            Cookies.remove('token')
        })
    }

  return (
    <div className='my-5'>
        <Container>
            <Row>
                <Col md='8'>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Row>
                                <Col md='6'>
                                    <video className='w-100' playsInline autoPlay ref={myVideo} />
                                </Col>
                                <Col md='6'>
                                    <video className='w-100' playsInline autoPlay ref={userVideo}/>
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
                    <Card>
                        <Card.Body className='d-flex justify-content-between'>
                            {
                                call.status && <h1>All Calling Status</h1>
                            }
                            {
                                call.isCalling &&
                                <>
                                    <h1>{ caller.name } is calling...</h1>
                                    <div>
                                        <Button variant="success" size='lg' onClick={handleAnswer}>Answer</Button>
                                        <b className='mx-3'>OR</b>
                                        <Button variant="danger" size='lg' onClick={handleAnswer}>Reject</Button>
                                    </div>
                                </>
                            }
                            {
                                call.isAccepted &&
                                <>
                                    <h1>Connected with { caller.name }</h1>
                                    <div>
                                    <Button variant="danger" size='lg' onClick={ handleEndCall }>End Call</Button>
                                    </div>
                                </>
                            }                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col md='4'>
                    {/* <Card>
                        <Card.Header>
                             <h3>Call a Friend</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form.Control type='text' placeholder='Give your name'/>
                            <Form.Control type='text' placeholder='ID to call'/>
                        </Card.Body>
                    </Card> */}

                    <Card>
                        <Card.Header className='d-flex justify-content-between'>
                            <h3>Call a Friend</h3>
                            <Button onClick={ handleLogOut }> Log Out </Button>
                        </Card.Header>
                        <Card.Body className='card-height'>
                            <Form.Control type='text' placeholder='FNF Name or Email'/>
                            <hr />
                            <div className="all-fnf">
                                {
                                    users.map(data => 
                                        <Card bg='primary my-2'>
                                            <Card.Body className="fnf">
                                                <div className="user">
                                                    <h4>{ data.name }</h4>
                                                    <b>{ data.status ? 'Active' : 'InActive' }</b>
                                                </div>
                                                <div className="status">
                                                    <Button onClick={ () => handleCall(data.callId) } size='lg' variant='dark'>Call Now</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>                                        
                                    )
                                }                                    
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
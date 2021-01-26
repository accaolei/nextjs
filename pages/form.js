import * as React from 'react';
import {Form, Upload,message, Input, Button} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import 'antd/dist/antd.css';
import OSS from 'ali-oss'

export default  function FormDemo(){
    const [form] = useForm()
    const [fileList,setFileList] = React.useState([])
    React.useEffect(()=>{
        console.log(fileList,'effect')
    },[fileList])

    const uploadProps={
        onRemove: file => {
            const index = fileList.indexOf(file);
            setFileList((oldValues)=>{
                oldValues.splice(index,1)
                return [...oldValues]
            })
            form.setFieldsValue({'cover_url':fileList})
        },
        beforeUpload:file=>{
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
                return
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
                return
            }
            setFileList([...fileList,file])
        
            return false
        },
        data:{
            key: 'test.png',
            OSSAccessKeyId: 'STS.NTpajeKfautEBohHdqivkWo2z',
            policy: 'eyJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJ5aXl1LW1wIn0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ1c2Vycy8zL2ltZ3MiXV0sImV4cGlyYXRpb24iOiIyMDIxLTAxLTI1VDA5OjQxOjAzWiJ9',
            Signature: 'Q1JkaE01TXVzRjNhelVocHFQQURSV2Rtd2Q4eEdXRGg0YU1GNlBvWGRSZ1WB2ToOAW5HhTA7GWh4WhUHWbyZhQ==',
            'x-oss-security-token': 'CAISwQJ1q6Ft5B2yfSjIr5fFKtDRprlAwrauQEnZrGQkZflHuKqZmDz2IH9OfnBoBO4cv/41lWxR6v4dlq9oQppdQUGcwjO0QQ8Ro22beIPkl5GfD9Vm4cTX9QHxZjf/2MjNGaqbKPrWZvaqbX3diyZ32sGUXD6+XlujQ/rr7Jl8dYYvQxWfZzhLD8ssHGkEksIBMmbLPvuAKwPjhnGqbHBloQ1hk2hym/rdssSX8UjZl0aoiL1X9ZnqL4K/KJIrPZJwSLXH1edtJK3ay3wSuVoY6bx7lrcDonDGu96GRBtzm0zXabWKqo01fFYhPPVlQPF+waKixaEiiIv6jJ/qzhtBB+ZRXhnESZqoqMm+Q7zzbI9hKOihai6Xg4zWasGqqXAtZXMKKQVNYME9LXx9DxMhTDzAI7Og4krNZgqz6lkADi36D/EagAER+haEFjk4N5QY6z3g17Xv6kP3PG5cOO6iqm0FoPegC589uVkjTiC8h8I+SL43nQ8ry6N3sV/P8S3VjrdGnDOzxFd/zixPbktAMDGx1C/zgGMf1+CbFXaEMdCwJAx9ZJYRPVdq704GxKUqqRA5sYA6TzF5eOxa4u+2mzAhUKa/+g==',
        },
        fileList,
        
    }
    const onSubmit=()=>{
        const values = form.getFieldsValue()
        console.log(values)
        console.log(fileList)
        onUpload()
    }

    const onUpload = async ()=>{
        
        let client = new OSS({
            region: 'oss-cn-zhangjiakou',
            accessKeyId: 'STS.NUaFFTxJBzeVzKb1JTm2ft1Pb',
            accessKeySecret: '6jK2upG82x7kQ4ai9rt45yphdVM73RW1QBVFkqBkhUbf',
            stsToken: 'CAISmwJ1q6Ft5B2yfSjIr5bUDfzglZVjzae9eG3T1UoBYb1Km/T7gDz2IH9OfnBoBO4cv/41lWxR6v4dlq9oQppdQUGcrWyDVQ8Ro22beIPkl5Gf4N5t0e+tewW6Dxr8w7WMAYHQR8/cffGAck3NkjQJr5LxaTSlWS7TU/iOkoU1VskLeQO6YDFaZrJRPRAwh8IGEnHTOP2xSGmI5FDdF011oAFxpHpi4KCkuK2m5wHZkUfxx51+xe2zAOD9PpMzYs8vCYfshLYrKfGe6kMKtUgWrpURpbdf5DLKsuuaB1Rs+BicO4LWiIYwdlUgPvVkQf8e9qmgzKEg5fagnoD22gtLOvpOTyPcSYavzc3JAuq1McwjcrL2K9U8Vw4D+keeGoABiFgMOoNtZdKJkocX7+/6jRNx/8DG7cH8pLn7VY1sRIjb+/l/dst0/iv22X9/kfMvmx2vy6SPNI1ICC5a60VRpZQLoGLGEpjRiQmb4i0SQOpAED/xSEwovLwcpyVxtnR0K8XtVvIBgp+mBW6qgQGNB78fnAzweNRw74XKBDmDxns=',
            bucket: 'yiyu-mp',
            secure: true,
            timeout:50000,
        })
        
        const result = await client.put('ram-test/examplefolder/test.png',fileList[0]);
        console.log(result)
    }
    

    return (
        <div style={{marginLeft:'auto', marginRight:'auto',width:700}}>
            <Form form={form}>
                <Form.Item name="test_input" >
                    <Input />
                </Form.Item>
                <Form.Item name="cover_url" valuePropName="cover_url">
                    <Upload {...uploadProps} listType="picture-card">
                        {fileList.length >0 ? '' : <Button  type="link">upload</Button>}
                    </Upload>
                </Form.Item>
                <Form.Item name="test_input" >
                    <Button htmlType="button" onClick={onSubmit} >Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

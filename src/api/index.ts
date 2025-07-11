import axios from 'axios';
import { message } from "antd";

const isProd = import.meta.env.PROD

const hostname = location.hostname;
const port = 3003;

const [messageApi, contextHolder] = message.useMessage();

const messageError = (content: string) => {
    messageApi.open({
        type: 'error',
        content,
    });
};

axios.interceptors.request.use(function (response) {
  response.headers['token'] = localStorage.getItem("token")
  console.log('response', response)
  return response;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('response', response)
  // response.data.msg
  // ElMessage.error('Oops, this is a error message.')
  // if (response.data.msg) ElMessage.error(response.data.msg)
  // if (response.data.status !== 0) return Promise.reject(response.data.msg);
  if (response.data.status !== 0) {
    messageError(response.data.msg)
    if (response.data.msg === '用户未登录') {
      // 移除token
      localStorage.removeItem("token")
      // 跳转到/login
      window.location.href = '/login'
    }
    return Promise.reject(response.data.msg);
  }

  // response.headers['token'] = localStorage.getItem("token")
  
  console.log('response', response)
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

// const vip/pay/qrcode
const VIP_QRCODE = () => axios.get(`http${location.host === 'localhost:5173' ? '' : 's'}://${location.host === 'localhost:5173' ? 'localhost:3003' : 'api2.jiniubao.com'}/api2/vip/pay/qrcode`, {
  params: {
    // uuid
    // id,
    // appVersion,
    // appName
  },
  headers: {
    // token: localStorage.getItem("token")
  }
}).then(res => res.data.data)

const CHATS_SEND = ({ sessionId, senderType, senderId, content }) => axios.post('https://api.jiniubao.com/api/chat/send', {
  sessionId,
  senderType,
  senderId,
  content,
}, {
  headers: {
    // token: localStorage.getItem("token")
  }
})

export default {
  CHATS: {
    SEND: CHATS_SEND,
  }
}

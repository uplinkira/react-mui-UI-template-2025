import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const Agreement: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box id="user-agreement">
          <Typography variant="h4" component="h1" gutterBottom>
            用户协议
          </Typography>
          <Typography variant="body1" paragraph>
            欢迎光临[公司名称]网站。[公司名称]致力于为您提供最优质、最便捷的服务。在访问[公司名称]的同时，也请您仔细阅读我们的协议条款。您需要同意该条款才能注册成为我们的用户。一经注册，将视为接受并遵守该条款的所有约定。
          </Typography>

          <Typography variant="h6" gutterBottom>
            1. 用户注册与信息管理
          </Typography>
          <Typography variant="body1" paragraph>
            用户应按照[公司名称]的注册、登陆程序和相应规则进行注册、登陆，注册信息应真实可靠，信息内容如有变动应及时更新。
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. 信息发布规范
          </Typography>
          <Typography variant="body1" paragraph>
            用户应在适当的栏目或地区发布信息，所发布信息内容必须真实可靠，不得违反[公司名称]对发布信息的禁止性规定。用户对其自行发表、上传或传送的内容负全部责任。
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. 法律法规遵守
          </Typography>
          <Typography variant="body1" paragraph>
            遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释》、《互联网电子公告服务管理规定》等有关计算机互联网规定和知识产权的法律和法规、实施办法。
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. 禁止发布的内容
          </Typography>
          <Typography variant="body1" paragraph>
            所有用户不得在[公司名称]任何版块发布、转载、传送含有下列内容之一的信息，否则[公司名称]有权自行处理并不通知用户：
          </Typography>
          <Typography variant="body1" component="div" sx={{ pl: 2 }}>
            (1) 违反宪法确定的基本原则的；<br />
            (2) 危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；<br />
            (3) 损害国家荣誉和利益的；<br />
            (4) 煽动民族仇恨、民族歧视，破坏民族团结的；<br />
            (5) 破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
            (6) 散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；<br />
            (7) 侮辱或者诽谤他人，侵害他人合法权益的；<br />
            (8) 含有法律、行政法规禁止的其他内容的。
          </Typography>
        </Box>

        <Box id="privacy-policy">
          <Typography variant="h4" component="h1" gutterBottom>
            隐私政策
          </Typography>
          <Typography variant="body1" paragraph>
            [公司名称]（以下简称"我们"）深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。
          </Typography>

          <Typography variant="h6" gutterBottom>
            一、信息收集与使用
          </Typography>
          <Typography variant="body1" paragraph>
            我们仅会出于本政策所述的以下目的，收集和使用您的个人信息：
          </Typography>
          <Typography variant="body1" component="div" sx={{ pl: 2 }}>
            1. 注册成为用户：<br />
            为完成创建账号，您需提供以下信息：您的姓名、电子邮箱地址、创建的用户名和密码等信息。<br /><br />
            2. 服务改进：<br />
            我们收集数据是根据您与我们的互动和您所做出的选择，包括您的隐私设置以及您使用的产品和功能。
          </Typography>

          <Typography variant="h6" gutterBottom>
            二、信息保护
          </Typography>
          <Typography variant="body1" paragraph>
            我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。
          </Typography>

          <Typography variant="h6" gutterBottom>
            三、联系我们
          </Typography>
          <Typography variant="body1" paragraph>
            如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式与我们联系：<br />
            邮箱：[联系邮箱]
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Agreement; 
import { ResponseBody } from '../request'

const PageRoutePrefix = 'dashboard-workbench'

export const DashboardWorkbench: Record<string, ResponseBody> = {
  [`${PageRoutePrefix}/data`]: {
    code: 200,
    data: {
      userInfo: {
        name: '张楚岚',
        company: '山东优迅子站-滨州智迅',
        title: '高级工程师',
        avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
        myCollection: [
          { id: 1, title: '手机' },
          { id: 2, title: '平板' },
          { id: 3, title: '游戏机' },
          { id: 4, title: '电池' },
          { id: 5, title: '家用电器' },
        ],
      },
      banners: [
        {
          imgUrl:
            'https://images.unsplash.com/photo-1595923941716-39a9c58a9661?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          jumpUrl: 'https://github.com/XiaoMi/hiui/tree/next/4.0',
          title: 'HiUI 4.0',
        },
        {
          imgUrl:
            'https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
          jumpUrl: 'https://github.com/hiui-group/hiui-template/tree/master-pro',
          title: 'HiUI Template Pro',
        },
      ],
      study: {
        courseCountToLearn: 3,
        courses: [
          {
            title: '手机-初级课程',
            organization: '售后培训组',
            remainingDays: 1,
            learners: [
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg' },
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/02.jpeg' },
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/03.jpeg' },
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/04.jpeg' },
            ],
            learnersCount: 99,
          },
          {
            title: '手机-初级课程',
            organization: '售后培训组',
            remainingDays: 1,
            learners: [
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg' },
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/02.jpeg' },
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/03.jpeg' },
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/04.jpeg' },
            ],
            learnersCount: 99,
          },
          {
            title: '手机-初级课程',
            organization: '售后培训组',
            remainingDays: 1,
            learners: [
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg' },
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/02.jpeg' },
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/03.jpeg' },
              { avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/04.jpeg' },
            ],
            learnersCount: 99,
          },
        ],
        recommends: [
          {
            coverUrl:
              'https://cnbj1.fds.api.xiaomi.com/hiui-template/resources/workbench-cover-01.png',
            title: '手机-初级课程',
            organization: '售后培训组',
            viewCount: 4147,
            commentCount: 12,
            collectionCount: 213,
            author: '张楚岚',
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            publishTime: '三小时前',
          },
          {
            coverUrl:
              'https://cnbj1.fds.api.xiaomi.com/hiui-template/resources/workbench-cover-02.png',
            title: '手机-初级课程',
            organization: '售后培训组',
            viewCount: 4147,
            commentCount: 12,
            collectionCount: 213,
            author: '张楚岚',
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            publishTime: '三小时前',
          },
          {
            coverUrl:
              'https://cnbj1.fds.api.xiaomi.com/hiui-template/resources/workbench-cover-03.png',
            title: '手机-初级课程',
            organization: '售后培训组',
            viewCount: 4147,
            commentCount: 12,
            collectionCount: 213,
            author: '张楚岚',
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            publishTime: '三小时前',
          },
          {
            coverUrl:
              'https://cnbj1.fds.api.xiaomi.com/hiui-template/resources/workbench-cover-04.png',
            title: '手机-初级课程',
            organization: '售后培训组',
            viewCount: 4147,
            commentCount: 12,
            collectionCount: 213,
            author: '张楚岚',
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            publishTime: '三小时前',
          },
        ],
      },
      exam: {
        courseCountToExam: 2,
        exams: [
          {
            title: '手机-初级课程',
            organization: '售后培训组',
            durationMinutes: 60,
          },
          {
            title: '手机-初级课程',
            organization: '售后培训组',
            durationMinutes: 60,
          },
        ],
      },
      certification: {
        list: [
          {
            id: 1,
            title: '寄修-技术-智能控制',
            description: '服务能力：送修-技术-暖奶器',
            cost: '50 元',
            type: '初级',
            rank: 3,
            publishTime: '一小时前',
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-certification-01.png',
            acquired: false,
          },
          {
            id: 2,
            title: '寄修-技术-智能控制',
            description: '服务能力：送修-技术-暖奶器',
            cost: '50 元',
            type: '高级',
            rank: 1,

            publishTime: '一小时前',
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-certification-01.png',
            acquired: false,
          },
          {
            id: 3,
            title: '寄修-技术-智能控制',
            description: '服务能力：送修-技术-暖奶器',
            cost: '50 元',
            type: '中级',
            rank: 2,
            publishTime: '一小时前',
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-certification-01.png',
            acquired: true,
          },
          {
            id: 4,
            title: '寄修-技术-智能控制',
            description: '服务能力：送修-技术-暖奶器',
            cost: '50 元',
            type: '初级',
            rank: 3,
            publishTime: '一小时前',
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-certification-01.png',
            acquired: false,
          },
          {
            id: 5,
            title: '寄修-技术-智能控制',
            description: '服务能力：送修-技术-暖奶器',
            cost: '50 元',
            type: '初级',
            rank: 3,
            publishTime: '一小时前',
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-certification-01.png',
            acquired: false,
          },
          {
            id: 6,
            title: '寄修-技术-智能控制',
            description: '服务能力：送修-技术-暖奶器',
            cost: '50 元',
            type: '初级',
            rank: 3,
            publishTime: '一小时前',
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-certification-01.png',
            acquired: false,
          },
        ],
      },
      activities: {
        list: [
          {
            author: {
              avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
              name: '张楚岚',
            },
            action: '回答了您的问题',
            content: '关于小米10、小米10至尊纪念版好不好用',
            time: '2022/02/28',
            icon: 'ChatFilled',
            iconColor: 'success',
          },
          {
            author: {
              avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/02.jpeg',
              name: '您',
            },
            action: '完成了课程',
            content: '小米笔记本产品三包政策',
            time: '2022/02/28',
            icon: 'AssetMonitorFilled',
            iconColor: 'secondary',
          },
          {
            author: {
              avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/03.jpeg',
              name: '您',
            },
            action: '完成了考试',
            content: '关于小米10、小米10至尊纪念版好不好用',
            time: '2022/02/28',
            icon: 'EditFilled',
            iconColor: 'secondary',
          },
          {
            author: {
              avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/04.jpeg',
              name: '张三',
            },
            action: '通过了您的审核',
            content: '关于小米10、小米10至尊纪念版好不好用',
            time: '2022/02/28',
            icon: 'LightningFilled',
            iconColor: 'success',
          },
          {
            author: {
              avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/05.jpeg',
              name: '李四',
            },
            action: '通过了您的审核',
            content: '关于小米10、小米10至尊纪念版好不好用',
            time: '2022/02/28',
            icon: 'LightningFilled',
            iconColor: 'secondary',
          },
          {
            author: {
              avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
              name: '王五',
            },
            action: '通过了您的审核',
            content: '关于小米10、小米10至尊纪念版好不好用',
            time: '2022/02/28',
            icon: 'LightningFilled',
            iconColor: 'success',
          },
        ],
      },
      faqs: {
        list: [
          {
            id: 1,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 2,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/02.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 3,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/03.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 4,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/04.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 5,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/05.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 6,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
        ],
      },
      words: {
        list: [
          {
            id: 1,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 2,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 3,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 4,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 5,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
          {
            id: 6,
            title: 'Redmi KKK 自动重启的情况说明。',
            author: '涂其航 ',
            avatarUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            answer:
              '您好，Redmi KKK 自动重启已在 V12.5.19.0.RKHCNXM版本上优化，请更新至最新MIUI版本即可解决 KKK',
            type: '日程',
            publishTime: '2021/02/07 16:50:25',
            viewCount: 4147,
            commentCount: 213,
            collectionCount: 32,
          },
        ],
      },
      industryExperts: {
        list: [
          {
            name: '张楚岚',
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
            description: '山东优迅子站-滨州智迅',
            honor: '手机类词条创建第一名',
            honorRank: 1,
            followed: false,
          },
          {
            name: '宗琴',
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/02.jpeg',
            description: '山东优迅子站-滨州智迅',
            honor: '手机类获赞第二名',
            honorRank: 2,
            followed: true,
          },
          {
            name: '郗绍',
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/05.jpeg',
            description: '山东优迅子站-滨州智迅',
            honor: '手机类回答问题第一名',
            honorRank: 1,
            followed: false,
          },
          {
            name: '庄娅凤',
            avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/04.jpeg',
            description: '山东优迅子站-滨州智迅',
            honor: '手机类词条创建第三名',
            honorRank: 3,
            followed: false,
          },
        ],
      },
      notice: {
        noticeCountToRead: 233,
        list: [
          {
            id: 1,
            description: '型号区分及功能检测指引-米家迷你保温杯产品-V01',
            type: '日程',
            publishTime: '一小时前',
          },
          {
            id: 2,
            description:
              '型号区分及功能检测指引-米家迷你保温杯产品型号区分及功能检测指引-米家迷你保温杯产品',
            type: '技术公告',
            publishTime: '三小时前',
          },
          {
            id: 3,
            description: '米家互联网洗烘一体机Pro 10kg 自动投放组件/抽屉弹不开维修方法',
            type: '系统公告',
            publishTime: '六小时前',
          },
          {
            id: 4,
            description: '型号区分及功能检测指引-米家迷你保温杯产品-V01',
            type: '日程',
            publishTime: '一天前',
          },
          {
            id: 5,
            description:
              '型号区分及功能检测指引-米家迷你保温杯产品型号区分及功能检测指引-米家迷你保温杯产品',
            type: '日程',
            publishTime: '三天前',
          },
        ],
      },
      docs: {
        list: [
          {
            id: 1,
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-docs-01.png',
            description: '型号区分及功能检测指引-米家迷你保温杯产品-V01',
            publishTime: '2021/02/07 16:50:25',
          },
          {
            id: 2,
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-docs-02.png',
            description: '型号区分及功能检测指引-米家迷你保温杯产品-V01',
            publishTime: '2021/02/07 16:50:25',
          },
          {
            id: 3,
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-docs-01.png',
            description: '型号区分及功能检测指引-米家迷你保温杯产品-V01',
            publishTime: '2021/02/07 16:50:25',
          },
          {
            id: 4,
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-docs-02.png',
            description: '型号区分及功能检测指引-米家迷你保温杯产品-V01',
            publishTime: '2021/02/07 16:50:25',
          },
          {
            id: 5,
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-docs-01.png',
            description: '型号区分及功能检测指引-米家迷你保温杯产品-V01',
            publishTime: '2021/02/07 16:50:25',
          },
          {
            id: 6,
            avatar:
              'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/workbench-docs-02.png',
            description: '型号区分及功能检测指引-米家迷你保温杯产品-V01',
            publishTime: '2021/02/07 16:50:25',
          },
        ],
      },
    },
  },
}

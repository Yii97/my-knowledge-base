"use client";

import { useState, useEffect } from "react";

// --- Navigation: chapters as anchor links within one page ---
const chapters = [
  { title: "一、项目是什么", id: "ch1" },
  { title: "二、整体架构", id: "ch2" },
  { title: "三、各组件职责", id: "ch3" },
  { title: "四、基础概念速查", id: "ch4" },
  { title: "五、技术栈速查", id: "ch5" },
  { title: "六、项目文件夹结构", id: "ch6" },
  { title: "七、AWS 核心服务详解", id: "ch7" },
  { title: "八、agent.py 详解", id: "ch8" },
  { title: "九、MCP 和 Gateway", id: "ch9" },
  { title: "十、认证", id: "ch10" },
  { title: "十一、本地开发", id: "ch11" },
  { title: "十二、部署流程", id: "ch12" },
  { title: "十三、加新查询工具", id: "ch13" },
  { title: "十四、排查问题", id: "ch14" },
  { title: "十五、开发流程和分工", id: "ch15" },
  { title: "十六、安全注意事项", id: "ch16" },
  { title: "十七、术语表", id: "ch17" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState("ch1");

  // Track scroll position to highlight active chapter
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(chapters[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveChapter(id);
    }
  };

  // Simple search: highlight matching text in the page
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      // Find first match and scroll to it
      const content = document.getElementById("main-content");
      if (content) {
        const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (node.textContent?.toLowerCase().includes(query.toLowerCase())) {
            const parent = node.parentElement;
            if (parent) {
              parent.scrollIntoView({ behavior: "smooth", block: "center" });
              break;
            }
          }
        }
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-200 bg-gray-50 overflow-y-auto flex-shrink-0 fixed h-full">
        <div className="p-4">
          <h1 className="text-lg font-bold text-blue-600 mb-2">📚 My Knowledge Base</h1>
          <p className="text-xs text-gray-500 mb-4">公司项目笔记</p>
          
          <div className="mb-4 px-2 py-1.5 bg-blue-50 rounded text-sm font-medium text-blue-700">
            Google Ops Intel Agent
          </div>

          <nav className="space-y-0.5">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                className={`w-full text-left text-sm px-3 py-1.5 rounded transition-colors ${
                  activeChapter === ch.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {ch.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 overflow-y-auto">
        {/* Search Bar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-3 z-10">
          <input
            type="text"
            placeholder="搜索关键词...（输入后按 Enter 跳转到匹配位置）"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* All content in one page */}
        <div id="main-content" className="max-w-4xl mx-auto px-8 py-6 prose-custom">
          <Content />
        </div>
      </main>
    </div>
  );
}

// --- Full content component (all chapters in one page) ---
function Content() {
  return (
    <article className="text-gray-700 leading-relaxed">
      {/* Chapter 1 */}
      <section id="ch1" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">一、项目是什么？</h2>
        <p>这是一个 <strong>AI 聊天机器人</strong>，让 CTDI 公司的 Google 运营团队可以用自然语言（说人话）查询业务数据，而不用手动翻看报表。</p>
        <p className="mt-2"><strong>例子：</strong></p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>用户问："上周收了多少台设备？"</li>
          <li>AI 自动查数据库，然后用人话回答："上周共收到 1,234 台，Pixel 8 最多..."</li>
        </ul>
      </section>

      {/* Chapter 2 */}
      <section id="ch2" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">二、整体架构</h2>
        
        <h3 className="text-lg font-semibold mt-6 mb-3">2.1 完整系统有两大块</h3>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono overflow-x-auto">{`.NET Blazor App（报表门户）
  ├── Dashboard（报表/图表）— .NET 团队负责
  └── AI Chatbox（聊天问答）— 调用 AI Agent（当前项目）`}</pre>
        <Table headers={["部分", "谁负责", "代码在哪"]} rows={[
          ["Dashboard（报表/图表）", ".NET 团队", "另一个 GitLab 仓库"],
          ["AI Chatbox（聊天问答）", "Elevate AI 团队", "当前项目"],
          ["用户认证、UI 框架", ".NET 团队", "另一个仓库"],
        ]} />
        <p className="mt-3">Dashboard 和 AI Chatbox <strong>共享同一个数据源</strong>（Oracle GOGADMIN），但访问方式不同。</p>

        <h3 className="text-lg font-semibold mt-6 mb-3">2.2 实际架构</h3>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono overflow-x-auto">{`用户输入问题
    ↓
.NET Blazor App（认证 + UI + 转发）
    ↓ HTTP POST
Invoke Lambda（转发）
    ↓
AI Agent（Claude Sonnet 4.6 思考）
    ↓
MCP Gateway → Gateway Lambda（查 Oracle）
    ↓
Oracle 数据库（GOGADMIN）
    ↓
AI 整理成人话 → 原路返回`}</pre>

        <h3 className="text-lg font-semibold mt-6 mb-3">2.3 完整请求流程（①-⑨）</h3>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono overflow-x-auto">{`① 用户输入："一月份收了多少台设备？按日期看"
② .NET App 原封不动发给 Invoke Lambda
③ Invoke Lambda 转发给 AgentCore Runtime
④ Claude AI 思考："应该调 dock_receive_summary"
⑤ AI 翻译成工具调用：query_operations("dock_receive_summary", {...})
⑥ MCP Gateway 转发到 Gateway Lambda
⑦ Gateway Lambda 拼 SQL、查 Oracle、返回数据
⑧ AI 整理成人话："1月共收到5432台，15日最多..."
⑨ 原路返回 → 用户看到答案`}</pre>
        <p className="mt-2"><strong>AI 的核心价值：</strong>把模糊的人话翻译成精确的工具调用（④⑤），再把数据翻译回人话（⑧）。</p>

        <h3 className="text-lg font-semibold mt-6 mb-3">2.4 为什么要这么多层？</h3>
        <Table headers={["疑问", "答案"]} rows={[
          ["为什么不让前端直接调 AI？", "安全。需要认证层把关"],
          ["为什么要 Invoke Lambda？", "解耦。.NET 只需调一个 URL"],
          ["为什么 AI 不直接查数据库？", "安全+灵活。Gateway 控制 AI 只能调特定工具"],
          ["为什么有 Gateway Lambda？", "AI 不会 SQL，Lambda 负责执行"],
        ]} />
      </section>

      {/* Chapter 3 */}
      <section id="ch3" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">三、各组件职责</h2>
        <Table headers={["组件", "职责", "类比"]} rows={[
          [".NET Blazor App", "认证 + UI + 转发", "酒店前台"],
          ["Invoke Lambda", "转发请求", "传话的服务员"],
          ["AI Agent (agent.py)", "理解问题 → 决定查什么 → 组织答案", "智能厨师"],
          ["MCP Gateway", "路由工具调用", "交换机"],
          ["Gateway Lambda", "执行 SQL 查询", "搬运工"],
          ["Oracle DB", "存储数据", "仓库"],
          ["Feedback Lambda", "收集用户反馈", "意见箱"],
        ]} />
      </section>

      {/* Chapter 4 */}
      <section id="ch4" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">四、基础概念速查</h2>
        <h3 className="text-lg font-semibold mt-4 mb-2">API</h3>
        <p>两个程序之间通信的约定。像餐厅菜单——告诉你能点什么、怎么点。</p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Endpoint</h3>
        <p>API 里的一个具体地址。像菜单上的一道菜。</p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Server</h3>
        <p>一直在等待请求的程序。有人来了 → 处理 → 返回结果。</p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Token</h3>
        <p>AI 计费单位，约等于一个词。输入输出都按 token 收费。</p>
        <h3 className="text-lg font-semibold mt-4 mb-2">第三方库</h3>
        <p>别人写好的代码包，<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">pip install xxx</code> 安装就能用。</p>
      </section>

      {/* Chapter 5 */}
      <section id="ch5" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">五、技术栈速查</h2>
        <Table headers={["技术", "是什么", "角色"]} rows={[
          ["Python", "编程语言", "Agent 和 Lambda 都用 Python"],
          ["AWS Lambda", "按次收费的代码运行环境", "运行查询和转发逻辑"],
          ["Bedrock AgentCore", "AI Agent 托管环境", "运行 agent.py"],
          ["Claude Sonnet 4.6", "AI 模型", "理解问题、推理、生成答案"],
          ["Strands SDK", "Agent 开发框架", "构建 Agent 的工具包"],
          ["MCP", "AI 调工具的协议", "Agent 调用 Gateway Lambda"],
          ["Oracle", "关系型数据库", "存储运营数据"],
          ["Docker", "容器工具", "打包代码+环境"],
          ["Flask", "Python Web 框架", "测试用聊天 UI"],
        ]} />
      </section>

      {/* Chapter 6 */}
      <section id="ch6" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">六、项目文件夹结构</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono overflow-x-auto">{`├── agent/           → AI Agent 核心代码（大脑）
│   ├── agent.py     → 主程序
│   ├── Dockerfile   → 容器打包配置
│   └── requirements.txt
├── gateway/         → 数据库查询 Lambda
│   ├── lambda_function.py → 5个工具的 SQL 逻辑
│   └── tool_schema.json   → 工具参数定义
├── lambda/
│   ├── invoke/      → 转发请求的 Lambda
│   └── feedback/    → 收集用户反馈
├── frontend/        → 测试用聊天 UI（Flask）
├── semantic-layer/  → 数据字典
├── docs/            → 项目文档
└── README.md`}</pre>
      </section>

      {/* Chapter 7 */}
      <section id="ch7" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">七、AWS 核心服务详解</h2>
        
        <h3 className="text-lg font-semibold mt-6 mb-3">7.1 Lambda</h3>
        <p>AWS 帮你跑一个函数，按次收费。项目有两个 Lambda：</p>
        <Table headers={["", "Invoke Lambda", "Gateway Lambda"]} rows={[
          ["角色", "传话员", "查数据库"],
          ["谁调", ".NET App", "AI Agent"],
          ["连数据库？", "不连", "连 Oracle"],
          ["复杂度", "~80行", "~500行"],
        ]} />
        <p className="mt-2">命名是 CTDI 起的，不是 AWS 规定的。</p>

        <h3 className="text-lg font-semibold mt-6 mb-3">7.2 Bedrock / AgentCore / Runtime</h3>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono">{`Bedrock（AI 大平台）→ AgentCore（Agent 托管服务）→ Runtime（一个具体实例）`}</pre>
        <p className="mt-2">AgentCore 不是 CTDI 开发的，是 AWS 的服务。Runtime 是 AWS 官方术语。</p>

        <h3 className="text-lg font-semibold mt-6 mb-3">7.3 SDK / ARN / 凭证</h3>
        <Table headers={["概念", "解释"]} rows={[
          ["SDK", "开发工具包（boto3 = AWS SDK，strands-agents = Agent SDK）"],
          ["ARN", "AWS 资源唯一 ID（像身份证号）"],
          ["凭证", "个人的 AWS 密钥（公司资源共享，凭证个人独立）"],
        ]} />

        <h3 className="text-lg font-semibold mt-6 mb-3">7.4 Container / Docker</h3>
        <p>Container = 把代码+环境打包的"集装箱"。Docker 是打包工具，Dockerfile 是配方。</p>
        <p className="mt-1"><strong>ARM64 vs ARN：</strong>完全无关！ARM64 是 CPU 架构，ARN 是资源 ID。</p>
      </section>

      {/* Chapter 8 */}
      <section id="ch8" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">八、agent.py 详解</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono">{`结构：
1. 导入库
2. ResponseCollector（收集 AI 输出）
3. 配置（URL、ID、模型名）
4. 消息清理器（修复格式 bug）
5. 工具定义（query_operations、search_kb、log_unanswered）
6. System Prompt（AI 的人设）
7. 限流器（30次/分）
8. invoke() 入口函数`}</pre>
        
        <h3 className="text-lg font-semibold mt-6 mb-3">Hook（钩子）</h3>
        <p>"某事发生时自动执行代码"。本项目：每次调 AI 前自动修复消息格式。</p>
        
        <h3 className="text-lg font-semibold mt-6 mb-3">记忆（STM / LTM）</h3>
        <Table headers={["类型", "存什么", "保留多久"]} rows={[
          ["STM（短期）", "当前对话上下文", "会话结束就没了"],
          ["LTM（长期）", "用户偏好、事实、摘要", "永久"],
        ]} />
        
        <h3 className="text-lg font-semibold mt-6 mb-3">Router Tool 省钱原理</h3>
        <p>5 个工具定义 ≈ 2500 token/次，1 个路由工具 ≈ 250 token/次。<strong>省 90%</strong>。</p>
        
        <h3 className="text-lg font-semibold mt-6 mb-3">基于 Starter 模板</h3>
        <p>agentcore-starter-main（Anthony Badowski 制作）提供骨架，CTDI 填了业务逻辑。</p>
      </section>

      {/* Chapter 9 */}
      <section id="ch9" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">九、MCP 和 Gateway</h2>
        <Table headers={["概念", "是什么"]} rows={[
          ["MCP", "开源通信协议（AI 调工具的标准）"],
          ["Gateway", "网关/转发站，不自己干活"],
          ["MCP Gateway", "用 MCP 协议的转发站（AWS 服务）"],
          ["Gateway Lambda", "被转发到的执行者（CTDI 代码）"],
        ]} />
        <p className="mt-3"><strong>同事说"gateway"时：</strong>"gateway 代码"→ Gateway Lambda，"gateway 配置"→ MCP Gateway。</p>
        <p className="mt-1">两者都已部署在公司 AWS 上。</p>
      </section>

      {/* Chapter 10 */}
      <section id="ch10" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">十、认证（Cognito / JWT）</h2>
        <Table headers={["组件", "负责", "类比"]} rows={[
          ["Cognito", "\u201c你是谁？\u201d（Authentication）", "检查工牌"],
          ["OLP User Table", "\u201c你能干什么？\u201d（Authorization）", "哪些房间能进"],
        ]} />
        <p className="mt-3"><strong>流程：</strong>用户登录 → Cognito 验证 → 返回 JWT Token → 后续每次请求带 Token → .NET App 验证签名/过期/来源。</p>
        <p className="mt-1"><strong>AI Agent 不做任何认证</strong>，信任上游。</p>
      </section>

      {/* Chapter 11 */}
      <section id="ch11" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">十一、本地开发</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono">{`生产：.NET App → Invoke Lambda → AgentCore
本地：Flask server.py → 直接调 AgentCore（跳过认证）`}</pre>
        <p className="mt-3"><strong>前提：</strong>Python + AWS Profile 凭证 + 网络通畅</p>
        <p className="mt-1"><strong>当前状况：</strong>没有凭证。✅ 能读代码/看 UI ❌ 不能调 AI/连 DB/部署</p>
      </section>

      {/* Chapter 12 */}
      <section id="ch12" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">十二、部署流程</h2>
        <Table headers={["", "Agent（容器）", "Lambda"]} rows={[
          ["打包", "Docker build → 镜像", "zip 压缩"],
          ["上传", "push 到 ECR", "aws lambda update-function-code"],
          ["版本", "Tag（v1, v2...）", "覆盖"],
          ["生效", "几分钟", "几秒"],
          ["回滚", "用上一个 tag", "拉回上个代码重传"],
        ]} />
        <p className="mt-3">GitLab CI 目前只做语法检查，不自动部署。</p>
      </section>

      {/* Chapter 13 */}
      <section id="ch13" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">十三、怎么加新查询工具</h2>
        <p><strong>改 3 个文件：</strong></p>
        <ol className="list-decimal ml-6 mt-2 space-y-1">
          <li><code className="bg-gray-100 px-1 rounded text-sm">gateway/lambda_function.py</code> — 写 handler + 注册 TOOL_HANDLERS</li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">gateway/tool_schema.json</code> — 定义参数（JSON）</li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">agent/agent.py</code> — 告诉 AI 有新工具</li>
        </ol>
        <p className="mt-3"><strong>部署顺序：</strong>Gateway Lambda → Tool Schema（S3）→ Agent 容器</p>
      </section>

      {/* Chapter 14 */}
      <section id="ch14" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">十四、排查问题</h2>
        <Table headers={["问题", "看哪里", "常见原因"]} rows={[
          ["AI 回答错", "Agent 日志", "选错工具/SQL bug"],
          ["查询超时", "Gateway 日志", "日期范围太大"],
          ["不响应", "Invoke 日志", "Runtime 不是 READY"],
          ["DB 连接失败", "Gateway 日志（ORA-）", "VPC/连接过期"],
        ]} />
        <p className="mt-3"><strong>自动保护：</strong>自动重连、100s 超时、30 次/分限流、15 次工具上限、8000 字截断。</p>
      </section>

      {/* Chapter 15 */}
      <section id="ch15" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">十五、开发流程和分工</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono">{`阶段 1：需求收集（数据源、用户问题、权限）
阶段 2：搭 AWS 环境（ECR、Runtime、Gateway、Lambda、S3）
阶段 3：写代码（Gateway Lambda → agent.py）
阶段 4：测试（部署 → Flask 对话 → 验证）
阶段 5：接入前端 + 上线
阶段 6：迭代（日志 → 加工具 → 调 prompt → 重新部署）`}</pre>
        <p className="mt-3"><strong>当前项目在阶段 6（迭代改进）。</strong></p>
        
        <h3 className="text-lg font-semibold mt-6 mb-3">分工</h3>
        <Table headers={["你负责", "Kiro 帮"]} rows={[
          ["提供表名、列名、用户问题", "写全部代码"],
          ["找管理员拿凭证", "❌ 做不了"],
          ["执行部署命令", "生成命令"],
          ["判断回答对不对", "修 bug"],
        ]} />
      </section>

      {/* Chapter 16 */}
      <section id="ch16" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">十六、安全注意事项</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>AI Agent <strong>只读</strong>连接数据库（TABLEAU_USER）</li>
          <li>禁止查认证表（USER_MASTER, USER_ROLES 等）</li>
          <li>Invoke Lambda URL 没有额外保护（待改进）</li>
          <li>System Prompt 有安全规则，禁止泄露内部信息</li>
        </ul>
      </section>

      {/* Chapter 17 */}
      <section id="ch17" className="scroll-mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">十七、术语表</h2>
        <Table headers={["术语", "解释"]} rows={[
          ["API", "两个程序通信的约定"],
          ["Endpoint", "API 里的一个具体地址"],
          ["Token", "AI 计费单位 ≈ 一个词"],
          ["Lambda", "AWS 按次收费的代码运行"],
          ["ARN", "AWS 资源唯一 ID"],
          ["Bedrock", "AWS AI 平台"],
          ["AgentCore", "Agent 托管服务"],
          ["Runtime", "一个 Agent 实例"],
          ["MCP", "AI 调工具的协议"],
          ["Gateway", "转发站/网关"],
          ["SDK", "开发工具包"],
          ["Docker", "容器工具"],
          ["Container", "打包好的代码+环境"],
          ["Hook", "事件触发时自动执行代码"],
          ["STM/LTM", "短期/长期记忆"],
          ["JWT", "加密身份令牌"],
          ["Cognito", "AWS 登录服务"],
          ["VPC", "虚拟私有网络"],
          ["S3", "AWS 对象存储"],
          ["ECR", "AWS 容器镜像仓库"],
          ["IAM", "AWS 权限管理"],
          ["CI/CD", "持续集成/部署"],
          ["CloudWatch", "AWS 日志服务"],
          ["Router Tool", "一个工具路由多个，省 token"],
          ["base query", "固定 SQL 模板"],
        ]} />
      </section>

      <div className="h-20" />
    </article>
  );
}

// --- Reusable Table Component ---
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
              {row.map((cell, ci) => (
                <td key={ci} className="border border-gray-200 px-3 py-2 text-gray-600">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

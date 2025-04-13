const challenges = Array(100).fill().map((_, index) => {
    const baseIndex = index % 5;
    const baseChallenge = [
        {
            title: "ブランドのコピーライティング",
            detail: "フレーバーミネラルウォーターブランド『Water For You』のキャッチフレーズを考えてください。ターゲットはビジネスパーソンで、リフレッシュと健康を意識した商品です。"
        },
        {
            title: "ターゲット分析",
            detail: "20代女性向けの新しい美容アプリのペルソナを作成してください。デモグラフィック特性、ライフスタイル、課題や悩みなどを具体的に設定します。"
        },
        {
            title: "SNSコンテンツ企画",
            detail: "オーガニック食品ブランドのInstagramアカウント用の1週間分の投稿企画を立案してください。"
        },
        {
            title: "メールマーケティング",
            detail: "新規登録ユーザー向けのウェルカムメールシリーズ（全3通）の文案を作成してください。"
        },
        {
            title: "競合分析",
            detail: "フィットネスアプリ市場における主要競合3社のSNSマーケティング戦略を分析してください。"
        }
    ][baseIndex];

    return {
        id: index + 1,
        title: baseChallenge.title,
        detail: baseChallenge.detail,
        isCompleted: false
    };
});
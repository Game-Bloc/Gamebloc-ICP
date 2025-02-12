use candid::CandidType;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, CandidType,)]
#[serde(rename_all = "camelCase")]
pub struct NewsV2 {
    pub br: Option<News>,
    pub stw: Option<News>,
    pub creative: Option<News>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq, Hash, CandidType,)]
#[serde(untagged)]
pub enum News {
    NewsContent(NewsContent),
    NoNews,
}

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq, Hash, CandidType,)]
#[serde(rename_all = "camelCase")]
pub struct NewsContent {
    pub hash: String,
    pub date: u64,
    pub image: Option<String>,
    pub motds: Option<Vec<NewsMotd>>,
    pub messages: Option<Vec<NewsMessages>>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq, Hash, CandidType,)]
#[serde(rename_all = "camelCase")]
pub struct NewsMotd {
    pub id: String,
    pub title: String,
    pub tab_title: String,
    pub body: String,
    pub image: String,
    pub tile_image: String,
    pub sorting_priority: i64,
    pub hidden: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq, Hash, CandidType)]
#[serde(rename_all = "camelCase")]
pub struct NewsMessages {
    pub title: String,
    pub body: String,
    pub image: String,
    // pub adspace: Option<_>,
}



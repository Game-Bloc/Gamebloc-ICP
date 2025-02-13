use candid::CandidType;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use fortnite_api::response_types::news::News as NewsResponse;
use fortnite_api::response_types::news::NewsMessages  as NewsResponseMessages;
use fortnite_api::response_types::news::NewsMotd  as NewsResponseMotd;

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

impl News {
    fn new(news_content:NewsContent) -> News {
        News::NewsContent(news_content)
    }
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

impl NewsContent {
    fn new(news_content:NewsResponse) -> Option<News> {
        match news_content {
            NewsResponse::NewsContent(newsContent) => {
                NewsContent{
                    hash: newsContent.hash,
                    date: newsContent.date.timestamp() as u64,
                    image: newsContent.image,
                    motds: Some(newsContent.motds.unwrap().iter().map()),
                    messages: Some(newsContent.messages.unwrap().map),
                }
            }
            NewsResponse::NoNews => {None}
        }
    }
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

impl NewsMotd {
    fn new(news_content:NewsResponse) -> Option<News> {
        match news_content {
            NewsResponse::NewsContent(newsContent) => {
                NewsContent{
                    hash: newsContent.hash,
                    date: newsContent.date.timestamp() as u64,
                    image: newsContent.image,
                    motds: Some(newsContent.motds.unwrap().iter().map()),
                    messages: Some(newsContent.messages.unwrap().map()),
                }
            }
            NewsResponse::NoNews => {None}
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq, Hash, CandidType)]
#[serde(rename_all = "camelCase")]
pub struct NewsMessages {
    pub title: String,
    pub body: String,
    pub image: String,
    // pub adspace: Option<_>,
}



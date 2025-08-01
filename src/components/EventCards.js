// EventCards.js
import React, { useState } from "react";

const EventCards = ({ events }) => {
  const [expandedImages, setExpandedImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [previewImg, setPreviewImg] = useState(null);

  /* ---------- 通用工具 ---------- */
  const toggleImageExpansion = (key) =>
    setExpandedImages((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleImageError = (key) =>
    setImageErrors((prev) => ({ ...prev, [key]: true }));

  const getPlatformIcon = (p) =>
    ({ weibo: "📱", bilibili: "📺", instagram: "📸", douyin: "🎵", kugou: "🎵", xiaohongshu: "📖" }[p] || "🔗");

  const getPlatformName = (p) =>
    ({ weibo: "微博", bilibili: "B站", instagram: "Instagram", douyin: "抖音", kugou: "酷狗", xiaohongshu: "小红书" }[p] || p);

  const getCategoryColor = (c) =>
    ({ 直播: "#e9f5cd", 采访: "#d1e7c7", 演出: "#bfdfc2", 小剧场: "#aad3bd", vlog: "#96c8b9", 生日: "#81bdb3", 主题集合: "#FFD700" }[c] || "#95A5A6");

  const getCategoryIcon = (c) =>
    ({ 直播: "📺", 采访: "🎤", 演出: "🎭", 小剧场: "🎬", vlog: "📹", 生日: "🎂", 主题集合: "🌟" }[c] || "📋");

  const shouldShowCategory = (c) =>
    ["直播", "采访", "演出", "小剧场", "vlog", "生日", "主题集合"].includes(c);

  /* ---------- 渲染评论区 ---------- */
  const renderComments = (comments = []) =>
    comments.length === 0 ? null : (
      <div className="event-comments">
        <div className="comments-title">相关评论</div>
        {comments.map((c, idx) => (
          <div className="event-comment" key={idx}>
            {c.avatar && <img className="comment-avatar" src={c.avatar} alt={c.author} />}
            <div className="comment-content">
              <span className="comment-author">{c.author}</span>
              {c.time && <span className="comment-time">{c.time}</span>}
              <div className="comment-text">{c.content}</div>
              {c.images?.length > 0 && (
                <div className="comment-images">
                  {c.images.map((img, i) => (
                    <img
                      key={i}
                      className="comment-image"
                      src={img.url}
                      alt={img.alt || "评论图片"}
                      onClick={() => setPreviewImg(img.url)}
                      style={{ cursor: "zoom-in" }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="event-cards">
      {events.length === 0 && <div className="no-events">这一年暂无事件</div>}
      {events.map((event, idx) => (
        <div className={`event-card ${event.isThemeGroup ? "theme-group" : ""}`} key={idx}>
          <div className="event-header">
            <div className="event-date">
              {event.isThemeGroup ? (
                <span className="theme-group-date">
                  <span className="theme-icon">🌟</span>
                  {event.date.replace("2018-", "")}
                </span>
              ) : (
                event.date
              )}
            </div>
            {event.category && shouldShowCategory(event.category) && (
              <div
                className="category-tag"
                style={{ backgroundColor: getCategoryColor(event.category) }}
              >
                <span className="category-icon">{getCategoryIcon(event.category)}</span>
                <span className="category-text">{event.category}</span>
              </div>
            )}
          </div>
          <div className="event-title">
            {event.content || event.category}
          </div>
          {event.subItems && event.subItems.length > 0 ? (
            <div className="theme-group">
              {event.themeName && (
                <div className="theme-title">{event.themeName}</div>
              )}
              {event.subItems.map((item, subIdx) => {
                const expandKey = `subitem-${subIdx}`;
                return (
                  <div className="event-card highlighted-subitem" key={subIdx}>
                    <div className="event-header">
                      <div className="event-date">{item.date}</div>
                      {item.category && shouldShowCategory(item.category) && (
                        <div
                          className="category-tag"
                          style={{ backgroundColor: getCategoryColor(item.category) }}
                        >
                          <span className="category-icon">{getCategoryIcon(item.category)}</span>
                          <span className="category-text">{item.category}</span>
                        </div>
                      )}
                    </div>
                    <div className="event-subitem-title">{item.title}</div>

                    {item.socialLinks?.length > 0 && (
                      <div className="social-links">
                        {item.socialLinks.map((lnk, lnkIdx) => (
                          <a
                            key={lnkIdx}
                            href={lnk.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            title={`前往${getPlatformName(lnk.platform)}`}
                          >
                            <span className="social-icon">{lnk.icon || getPlatformIcon(lnk.platform)}</span>
                            <span className="social-platform">{getPlatformName(lnk.platform)}</span>
                          </a>
                        ))}
                      </div>
                    )}

                    {item.details?.length > 0 && (
                      <ul className="event-details">
                        {item.details.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    )}

                    {item.images?.length > 0 && (
                      <div className="event-images">
                        <div className="images-header">
                          <span className="images-icon">📷</span>
                          <span className="images-text">相关图片</span>
                          <button className="expand-button" onClick={() => toggleImageExpansion(expandKey)}>
                            {expandedImages[expandKey] ? "收起" : "展开"}
                          </button>
                        </div>
                        <div className={`images-container ${expandedImages[expandKey] ? "expanded" : ""}`}>
                          {item.images.map((img, imgIdx) => {
                            const imgKey = `${expandKey}-${imgIdx}`;
                            const hasError = imageErrors[imgKey];
                            return (
                              <div className="image-item" key={imgIdx}>
                                {hasError ? (
                                  <div className="event-image placeholder-image">
                                    <div>
                                      <div>📷</div>
                                      <div>图片加载失败</div>
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    src={img.url}
                                    alt={img.alt}
                                    className="event-image"
                                    onError={() => handleImageError(imgKey)}
                                  />
                                )}
                                {img.caption && <div className="image-caption">{img.caption}</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 🔥 子事件专属评论区 */}
                    {renderComments(item.comments)}
                  </div>
                );
              })}
            </div>
          ) : (
            /* ---------- 普通事件 ---------- */
            <>
              {event.socialLinks?.length > 0 && (
                <div className="social-links">
                  {event.socialLinks.map((lnk, lnkIdx) => (
                    <a
                      key={lnkIdx}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      title={`前往${getPlatformName(lnk.platform)}`}
                    >
                      <span className="social-icon">{lnk.icon || getPlatformIcon(lnk.platform)}</span>
                      <span className="social-platform">{getPlatformName(lnk.platform)}</span>
                    </a>
                  ))}
                </div>
              )}

              {event.images?.length > 0 && (
                <div className="event-images">
                  <div className="images-header">
                    <span className="images-icon">📷</span>
                    <span className="images-text">相关图片</span>
                    <button className="expand-button" onClick={() => toggleImageExpansion(`event-${idx}`)}>
                      {expandedImages[`event-${idx}`] ? "收起" : "展开"}
                    </button>
                  </div>
                  <div className={`images-container ${expandedImages[`event-${idx}`] ? "expanded" : ""}`}>
                    {event.images.map((img, imgIdx) => {
                      const imgKey = `event-${idx}-${imgIdx}`;
                      const hasError = imageErrors[imgKey];
                      return (
                        <div className="image-item" key={imgIdx}>
                          {hasError ? (
                            <div className="event-image placeholder-image">
                              <div>
                                <div>📷</div>
                                <div>图片加载失败</div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={img.url}
                              alt={img.alt}
                              className="event-image"
                              onError={() => handleImageError(imgKey)}
                            />
                          )}
                          {img.caption && <div className="image-caption">{img.caption}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {event.details?.length > 0 && (
                <ul className="event-details">
                  {event.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              )}

              {renderComments(event.comments)}
            </>
          )}

          {/* 图片放大预览 */}
          {previewImg && (
            <div className="img-modal" onClick={() => setPreviewImg(null)}>
              <img src={previewImg} alt="放大预览" className="img-modal-content" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventCards;
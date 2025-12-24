// Additional CSS for this page
        const style = document.createElement('style');
        style.textContent = `
            .ad-banner-section {
                background: white;
                border-radius: 12px;
                padding: 25px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                margin-bottom: 30px;
            }
            
            .ad-banner-section h2 {
                color: #2c3e50;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .ad-banners {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
            
            .ad-banner {
                border-radius: 10px;
                overflow: hidden;
                height: 200px;
                position: relative;
            }
            
            .video-container video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .ad-banner img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .video-overlay, .ad-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0,0,0,0.7));
                color: white;
                padding: 20px;
            }
            
            .maps-section {
                background: white;
                border-radius: 12px;
                padding: 25px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                margin-bottom: 30px;
            }
            
            .map-container {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 30px;
                margin-top: 20px;
            }
            
            .info-card, .directions {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            
            .map-actions {
                display: flex;
                gap: 15px;
                margin-top: 15px;
            }
            
            .btn-direction {
                background: #3498db;
                color: white;
                padding: 10px 20px;
                border-radius: 6px;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
            }
            
            .btn-direction:hover {
                background: #2980b9;
                transform: translateY(-2px);
            }
            
            .additional-info {
                background: white;
                border-radius: 12px;
                padding: 25px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
            }
            
            .info-item {
                text-align: center;
                padding: 20px;
                border-radius: 8px;
                background: #f8f9fa;
                transition: all 0.3s ease;
            }
            
            .info-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .info-item i {
                font-size: 2rem;
                color: #3498db;
                margin-bottom: 15px;
            }
            
            @media (max-width: 768px) {
                .ad-banners {
                    grid-template-columns: 1fr;
                }
                
                .map-container {
                    grid-template-columns: 1fr;
                }
                
                .info-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .map-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);

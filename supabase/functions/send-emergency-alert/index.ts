import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmergencyAlertRequest {
  contacts: Array<{ name: string; email: string }>;
  userName: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  status: string;
  timestamp: string;
  nearbyDisasters?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      contacts,
      userName,
      location,
      status,
      timestamp,
      nearbyDisasters,
    }: EmergencyAlertRequest = await req.json();

    console.log(`Sending emergency alert from ${userName} to ${contacts.length} contacts`);

    const googleMapsLink = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    
    const disasterInfo = nearbyDisasters && nearbyDisasters.length > 0
      ? `<div style="margin-top: 20px; padding: 15px; background-color: #fee; border-left: 4px solid #f44;">
           <h3 style="margin: 0 0 10px 0; color: #c33;">⚠️ Nearby Disasters:</h3>
           <ul style="margin: 0; padding-left: 20px;">
             ${nearbyDisasters.map(d => `<li>${d}</li>`).join('')}
           </ul>
         </div>`
      : '';

    const emailPromises = contacts.map((contact) =>
      resend.emails.send({
        from: "Saarthi Emergency Alert <onboarding@resend.dev>",
        to: [contact.email],
        subject: `🚨 EMERGENCY ALERT from ${userName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 28px;">🚨 EMERGENCY ALERT</h1>
              </div>
              
              <div style="background: white; padding: 30px; border: 2px solid #667eea; border-top: none; border-radius: 0 0 10px 10px;">
                <p style="font-size: 18px; font-weight: bold; color: #c33; margin-top: 0;">
                  Dear ${contact.name},
                </p>
                
                <p style="font-size: 16px;">
                  <strong>${userName}</strong> has sent you an emergency alert through Saarthi.
                </p>
                
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="margin-top: 0; color: #667eea;">Current Status:</h2>
                  <p style="font-size: 18px; margin: 10px 0;"><strong>${status}</strong></p>
                  
                  <h3 style="color: #667eea; margin-top: 20px;">📍 Location:</h3>
                  <p style="margin: 5px 0;">
                    Latitude: ${location.lat.toFixed(6)}<br>
                    Longitude: ${location.lng.toFixed(6)}
                    ${location.address ? `<br>Address: ${location.address}` : ''}
                  </p>
                  
                  <p style="margin: 15px 0;">
                    <a href="${googleMapsLink}" 
                       style="display: inline-block; background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                      📍 View on Google Maps
                    </a>
                  </p>
                  
                  <p style="color: #666; font-size: 14px; margin-top: 20px;">
                    Time: ${new Date(timestamp).toLocaleString()}
                  </p>
                </div>
                
                ${disasterInfo}
                
                <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin-top: 20px;">
                  <p style="margin: 0; color: #856404;">
                    <strong>⚠️ Please respond immediately</strong><br>
                    If you are able to help, please contact ${userName} as soon as possible.
                  </p>
                </div>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <p style="font-size: 12px; color: #999; text-align: center; margin-bottom: 0;">
                  This emergency alert was sent via Saarthi - Disaster Management System<br>
                  If you received this in error, please disregard this message.
                </p>
              </div>
            </body>
          </html>
        `,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Emergency alerts sent: ${successful} successful, ${failed} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sent: successful,
        failed: failed,
        message: `Emergency alert sent to ${successful} of ${contacts.length} contacts`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-emergency-alert function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
